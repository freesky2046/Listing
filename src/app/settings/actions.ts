"use server";

import { redirect } from "next/navigation";

export async function manageSubscriptionAction() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/stripe/portal`, { method: "POST" });
  const data = await res.json();
  if (data.url) {
    redirect(data.url);
  }
}
