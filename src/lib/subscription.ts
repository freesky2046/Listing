import { db } from "@/lib/db";

export type PlanType = "free" | "pro" | "enterprise";

/** 获取用户订阅，不存在则自动创建 Free */
export async function getOrCreateSubscription(userId: string) {
  let sub = await db.subscription.findUnique({ where: { userId } });

  if (!sub) {
    sub = await db.subscription.create({
      data: { userId, plan: "free" },
    });
  }

  return sub;
}

/** 获取用户当前计划 */
export async function getUserPlan(
  userId: string,
): Promise<PlanType> {
  const sub = await getOrCreateSubscription(userId);
  return sub.plan as PlanType;
}

/** 升级用户计划 */
export async function upgradePlan(userId: string, plan: PlanType) {
  return db.subscription.upsert({
    where: { userId },
    update: { plan },
    create: { userId, plan },
  });
}
