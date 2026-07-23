import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const result = await auth.getSession();
    const user = result?.data?.user ?? null;
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId } = await req.json();
    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const sub = await db.subscription.findUnique({
      where: { userId: user.id },
    });

    // 已有活跃订阅且点击的是同一个 plan → 去 Billing Portal 管理
    if (
      (sub?.status === "active" || sub?.status === "trialing") &&
      sub.stripePriceId === priceId
    ) {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: sub.stripeCustomerId!,
        return_url: `${req.nextUrl.origin}/settings`,
      });
      return NextResponse.json({ url: portalSession.url });
    }

    let stripeCustomerId = sub?.stripeCustomerId ?? undefined;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        metadata: { userId: user.id },
      });
      stripeCustomerId = customer.id;

      await db.subscription.upsert({
        where: { userId: user.id },
        update: { stripeCustomerId },
        create: { userId: user.id, stripeCustomerId, status: "free" },
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.nextUrl.origin}/listing`,
      cancel_url: `${req.nextUrl.origin}/#pricing`,
      metadata: { userId: user.id },
      integration_identifier: `checkout-${crypto.randomUUID().slice(0, 8)}`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
