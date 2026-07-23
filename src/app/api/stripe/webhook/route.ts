import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (!session.subscription || !session.metadata?.userId) return;

  const sub = await stripe.subscriptions.retrieve(
    session.subscription as string,
  );

  await db.subscription.upsert({
    where: { userId: session.metadata.userId },
    update: {
      stripeSubscriptionId: sub.id,
      stripePriceId: sub.items.data[0]?.price.id,
      status: sub.status,
      currentPeriodEnd: new Date(sub.currentPeriodEnd * 1000),
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    },
    create: {
      userId: session.metadata.userId,
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: sub.id,
      stripePriceId: sub.items.data[0]?.price.id,
      status: sub.status,
      currentPeriodEnd: new Date(sub.currentPeriodEnd * 1000),
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    },
  });
}

async function handleSubscriptionUpdated(sub: Stripe.Subscription) {
  const subscription = await db.subscription.findUnique({
    where: { stripeSubscriptionId: sub.id },
  });
  if (!subscription) return;

  await db.subscription.update({
    where: { stripeSubscriptionId: sub.id },
    data: {
      stripePriceId: sub.items.data[0]?.price.id,
      status: sub.status,
      currentPeriodEnd: new Date(sub.currentPeriodEnd * 1000),
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    },
  });
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  await db.subscription.updateMany({
    where: { stripeSubscriptionId: sub.id },
    data: {
      status: "canceled",
      stripePriceId: null,
      stripeSubscriptionId: null,
    },
  });
}
