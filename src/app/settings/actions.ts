"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function manageSubscriptionAction() {
  const result = await auth.getSession();
  const user = result?.data?.user ?? null;
  if (!user?.id) return;

  const sub = await db.subscription.findUnique({
    where: { userId: user.id },
  });

  const stripeCustomerId = sub?.stripeCustomerId;
  if (!stripeCustomerId) return;

  const origin = (await headers()).get("origin") ?? "http://localhost:3000";

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${origin}/settings`,
  });

  redirect(portalSession.url);
}
