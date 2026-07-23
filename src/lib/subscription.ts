import { db } from "@/lib/db";

/** Stripe Price ID → 套餐名称映射 */
export const PLANS: Record<string, { name: string; limit: number }> = {
  price_1Ttkg8FqNlRS41IKveeEg5cR: { name: "Pro", limit: 100 },
  price_1TwK42FqNlRS41IKVTImIvBq: { name: "Enterprise", limit: 300 },
};

/** 获取或创建用户订阅记录（默认 free） */
export async function getOrCreateSubscription(userId: string) {
  let sub = await db.subscription.findUnique({ where: { userId } });

  if (!sub) {
    sub = await db.subscription.create({
      data: { userId, status: "free", listingsLimit: 5 },
    });
  }

  return sub;
}

export function getPlanName(stripePriceId: string | null | undefined) {
  if (!stripePriceId) return "Free";
  return PLANS[stripePriceId]?.name ?? "Unknown";
}

export function getPlanLimit(stripePriceId: string | null | undefined) {
  if (!stripePriceId) return 5;
  return PLANS[stripePriceId]?.limit ?? 5;
}

export function isActive(sub: { status: string } | null) {
  return sub?.status === "active" || sub?.status === "trialing";
}

/** 付费用户每月重置：如果已过 currentPeriodEnd，用量清零并返回 true */
export async function maybeResetUsage(userId: string) {
  const sub = await db.subscription.findUnique({ where: { userId } });
  if (!sub) return false;

  const now = new Date();
  if (
    isActive(sub) &&
    sub.currentPeriodEnd &&
    now >= sub.currentPeriodEnd &&
    sub.listingsUsed > 0
  ) {
    await db.subscription.update({
      where: { userId },
      data: { listingsUsed: 0 },
    });
    return true;
  }
  return false;
}

/** 检查是否有可用配额（未登录返回 false） */
export async function canGenerate(userId: string) {
  const sub = await getOrCreateSubscription(userId);
  await maybeResetUsage(userId);
  // 重新取最新值
  const latest = await db.subscription.findUnique({ where: { userId } });
  if (!latest) return false;
  return latest.listingsUsed < latest.listingsLimit;
}

/** 获得剩余次数 */
export async function remainingListings(userId: string) {
  const sub = await getOrCreateSubscription(userId);
  return Math.max(0, sub.listingsLimit - sub.listingsUsed);
}

/** 消耗一次生成配额 */
export async function consumeListing(userId: string) {
  return db.subscription.update({
    where: {
      userId,
      listingsUsed: { lt: db.subscription.fields.listingsLimit },
    },
    data: {
      listingsUsed: { increment: 1 },
    },
  });
}
