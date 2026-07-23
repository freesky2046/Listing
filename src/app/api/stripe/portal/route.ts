import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth.getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sub = await db.subscription.findUnique({
    where: { userId: session.userId },
  });

  const stripeCustomerId = sub?.stripeCustomerId;
  if (!stripeCustomerId) {
    return NextResponse.json({ error: "No subscription" }, { status: 400 });
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${req.nextUrl.origin}/settings`,
  });

  return NextResponse.json({ url: portalSession.url });
}
