"use server";

import { upgradePlan } from "@/lib/subscription";
import type { PlanType } from "@/lib/subscription";
import { revalidatePath } from "next/cache";

export async function upgradeAction(userId: string, plan: PlanType) {
  await upgradePlan(userId, plan);
  revalidatePath("/settings");
}
