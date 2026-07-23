import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth.getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { priceId } = await req.json();
  if (!priceId) {
    return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
  }

  // 查找或创建 Stripe Customer
  let sub = await db.subscription.findUnique({
    where: { userId: session.userId },
  });

  let stripeCustomerId = sub?.stripeCustomerId ?? undefined;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      metadata: { userId: session.userId },
    });
    stripeCustomerId = customer.id;

    await db.subscription.upsert({
      where: { userId: session.userId },
      update: { stripeCustomerId },
      create: { userId: session.userId, stripeCustomerId, status: "free" },
    });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: stripeCustomerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.nextUrl.origin}/settings?checkout=success`,
    cancel_url: `${req.nextUrl.origin}/pricing`,
    metadata: { userId: session.userId },
    integration_identifier: `checkout-${crypto.randomUUID().slice(0, 8)}`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
