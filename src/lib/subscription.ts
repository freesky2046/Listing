import { db } from "@/lib/db";

/** Stripe Price ID → 套餐名称映射，随你在 Stripe Dashboard 创建后填入 */
export const PLANS: Record<string, { name: string }> = {
  price_1Ttkg8FqNlRS41IKveeEg5cR: { name: "Pro" },
  price_1TwK42FqNlRS41IKVTImIvBq: { name: "Enterprise" },
};

/** 获取或创建用户订阅记录（默认 free） */
export async function getOrCreateSubscription(userId: string) {
  let sub = await db.subscription.findUnique({ where: { userId } });

  if (!sub) {
    sub = await db.subscription.create({
      data: { userId, status: "free" },
    });
  }

  return sub;
}

export function getPlanName(stripePriceId: string | null | undefined) {
  if (!stripePriceId) return "Free";
  return PLANS[stripePriceId]?.name ?? "Unknown";
}

export function isActive(sub: { status: string } | null) {
  return sub?.status === "active" || sub?.status === "trialing";
}
