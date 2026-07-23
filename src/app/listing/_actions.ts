"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth/server";
import { canGenerate, consumeListing } from "@/lib/subscription";

export type QuotaReason = "login" | "quota";

export interface QuotaResult {
  allowed: boolean;
  reason?: QuotaReason;
  /** 已用次数（达到限制时返回） */
  used?: number;
  /** 次数上限（达到限制时返回） */
  limit?: number;
}

export async function generateListingAction(title: string, category: string, description: string) {
  const session = await auth.getSession();
  const user = session?.data?.user ?? null;

  if (!user?.id) {
    return { allowed: false, reason: "login" as const };
  }

  const allowed = await canGenerate(user.id);
  if (!allowed) {
    const sub = await db_subscription_find(user.id);
    return {
      allowed: false,
      reason: "quota" as const,
      used: sub?.listingsUsed ?? 0,
      limit: sub?.listingsLimit ?? 5,
    };
  }

  // 消耗一次配额
  const updated = await consumeListing(user.id);
  if (!updated) {
    // 并发保护：consumeListing 的条件更新失败了，说明刚好在临界值被抢完
    const sub = await db_subscription_find(user.id);
    return {
      allowed: false,
      reason: "quota" as const,
      used: sub?.listingsUsed ?? 0,
      limit: sub?.listingsLimit ?? 5,
    };
  }

  // Revalidate the /listing route cache so next navigation reads fresh quota
  revalidatePath("/listing");

  // TODO: real AI generation here — for now return mock data
  return {
    allowed: true,
    data: {
      title: "Stainless Steel Insulated Water Bottle 32oz — BPA-Free, Double-Wall Vacuum, Keeps Drinks Cold 24h Hot 12h — Leak-Proof Lid, Wide Mouth, Sports & Travel — Midnight Navy",
      bullets: [
        "ALL-DAY TEMPERATURE CONTROL — Double-wall vacuum insulation keeps beverages ice-cold for up to 24 hours or piping hot for 12 hours. No condensation, no sweating — your bag stays dry and your drink stays perfect.",
        "PREMIUM 18/8 STAINLESS STEEL — Crafted from food-grade, BPA-free stainless steel that won't rust, retain odors, or leave a metallic aftertaste. Built to survive drops, dings, and daily use.",
        "LEAK-PROOF, ONE-HAND LID — Patented FlexSip lid seals completely when closed and opens with a single thumb press. Drink while driving, hiking, or working without worrying about spills.",
        "WIDE MOUTH FOR EASY CLEANING — Fits ice cubes, fruit infusions, and most bottle brushes. Dishwasher safe (top rack) for no-hassle cleanup.",
        "LIFETIME SATISFACTION GUARANTEE — Love it or we'll replace it. Every bottle includes a 100% lifetime warranty. Join 50,000+ happy customers.",
      ],
      description: "Stay hydrated in style with the AQUAFORGE 32oz Insulated Water Bottle. Engineered for athletes, commuters, and outdoor enthusiasts, this premium stainless steel bottle combines cutting-edge temperature retention with a sleek, ergonomic design. Whether you're crushing a workout, conquering a trail, or powering through a workday, your water stays ice-cold from sunrise to sunset.\n\nThe wide-mouth opening lets you add ice cubes, lemon slices, or your favorite fruit infusions effortlessly. The leak-proof FlexSip lid delivers a smooth flow without splashing, and the powder-coated exterior provides a non-slip grip even with sweaty hands. Powder coating is chip-resistant and available in 12 vibrant colors.\n\nEvery AQUAFORGE bottle comes with a bonus cleaning brush, a spare silicone lid seal, and our famous lifetime warranty. Click 'Add to Cart' and taste the difference premium hydration makes.",
      searchTerms: "water bottle stainless steel insulated 32oz BPA free reusable sports bottle travel mug leak proof vacuum sealed gym camping hiking gift for men women",
    },
  };
}

async function db_subscription_find(userId: string) {
  const { db } = await import("@/lib/db");
  return db.subscription.findUnique({ where: { userId } });
}
