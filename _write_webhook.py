import os

content = r"""import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

/**
 * Stripe Webhook 密钥
 * 用于验证来自 Stripe 的请求签名，确保 webhook 事件确实来自 Stripe 而非伪造
 * 该值在 Stripe Dashboard → Developers → Webhooks 中获取
 */
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * POST /api/stripe/webhook
 *
 * Stripe Webhook 入口，接收 Stripe 推送的各类事件通知。
 * Stripe 会以 POST 方式将 JSON 事件推送到此端点，请求头中包含
 * stripe-signature 用于验证请求的合法性。
 *
 * 处理的 Stripe 事件类型：
 * - checkout.session.completed：用户完成支付，创建/更新订阅记录
 * - customer.subscription.updated：订阅状态变更（续费、升级、降级等）
 * - customer.subscription.deleted：订阅被取消
 */
export async function POST(req: NextRequest) {
  // 获取原始请求体文本（必须为原始文本，不能解析为 JSON，
  // 因为 Stripe 的签名校验依赖原始字节流）
  const body = await req.text();

  // 获取 Stripe 请求头中的签名，用于验证请求合法性
  const signature = req.headers.get("stripe-signature")!;

  // 验证签名并构造 Stripe 事件对象
  // 签名校验失败意味着请求内容被篡改或非 Stripe 来源，直接返回 400
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // 根据事件类型分发到对应的处理函数
  // 使用 try-catch 包裹整个分发逻辑，确保任一处理函数抛错时
  // 仍能返回合理的 HTTP 响应（Stripe 要求 2xx 响应）
  try {
    switch (event.type) {
      // 用户完成结账支付 → 创建或更新订阅记录
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object);
        break;

      // 订阅状态变更 → 同步最新的订阅信息到数据库
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;

      // 订阅被删除/取消 → 清空数据库中的订阅信息
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;
    }

    // 返回 200 告知 Stripe 事件已成功接收
    // Stripe 如果未收到 2xx 响应会进行重试
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }
}

/**
 * 处理 checkout.session.completed 事件
 *
 * 用户通过 Stripe Checkout 完成支付后触发。
 * 从 session 的 metadata.userId 中取出我们的用户 ID，
 * 然后将 Stripe 订阅信息写入数据库。
 *
 * 使用 upsert 操作：已存在则更新，不存在则创建。
 * 这样可以安全处理 Stripe 的重复推送（幂等性）。
 *
 * @param session - Stripe Checkout Session 对象，包含用户标识、支付金额、订阅 ID 等
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // 必须同时存在 subscription ID 和 metadata 中的 userId 才处理
  // metadata.userId 是在创建 Checkout Session 时通过 checkout.metadata 传入的
  if (!session.subscription || !session.metadata?.userId) return;

  // 通过 Stripe API 获取完整的订阅对象，以获取详细的价格、周期等字段
  const sub = await stripe.subscriptions.retrieve(
    session.subscription as string,
  );

  // upsert：以 userId 为唯一键，存在则更新，不存在则创建
  // 保证 Webhook 重复推送时不会产生重复数据
  await db.subscription.upsert({
    where: { userId: session.metadata.userId },

    // 更新场景：用户可能换了支付方式或套餐
    update: {
      stripeSubscriptionId: sub.id,                 // Stripe 订阅唯一 ID
      stripePriceId: sub.items.data[0]?.price.id,   // 当前价格方案 ID（用于判断套餐类型）
      status: sub.status,                            // active / past_due / canceled 等
      currentPeriodEnd: new Date(sub.current_period_end * 1000), // 当前计费周期结束时间（Unix 秒 → Date）
      cancelAtPeriodEnd: sub.cancel_at_period_end,   // 是否在周期结束时取消
    },

    // 创建场景：用户首次订阅
    create: {
      userId: session.metadata.userId,
      stripeCustomerId: session.customer as string,  // Stripe 客户 ID，关联后续支付
      stripeSubscriptionId: sub.id,
      stripePriceId: sub.items.data[0]?.price.id,
      status: sub.status,
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
  });
}

/**
 * 处理 customer.subscription.updated 事件
 *
 * 订阅发生任何变更时触发，包括：
 * - 成功续费
 * - 升级/降级套餐
 * - 暂停/恢复
 * - 取消（cancel_at_period_end 变为 true）
 *
 * 先查找数据库中是否存在该订阅记录，存在则同步最新状态。
 * 如果找不到对应记录（可能 Webhook 事件乱序到达），则跳过。
 *
 * @param sub - Stripe Subscription 对象，包含最新的订阅状态
 */
async function handleSubscriptionUpdated(sub: Stripe.Subscription) {
  // 查找数据库中是否已存在该订阅记录
  const subscription = await db.subscription.findUnique({
    where: { stripeSubscriptionId: sub.id },
  });

  // 如果还没有订阅记录（checkout 事件可能还未处理或丢失），暂不处理
  // 后续 checkout.session.completed 事件会通过 upsert 创建
  if (!subscription) return;

  // 同步 Stripe 最新订阅状态到数据库
  await db.subscription.update({
    where: { stripeSubscriptionId: sub.id },
    data: {
      stripePriceId: sub.items.data[0]?.price.id,   // 可能因升级/降级而变更
      status: sub.status,                            // 同步最新状态
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,   // 用户是否设置了到期取消
    },
  });
}

/**
 * 处理 customer.subscription.deleted 事件
 *
 * 订阅彻底取消/过期时触发，此时用户失去会员权益。
 * 将订阅状态标记为 "canceled" 并清除 Stripe 相关字段。
 *
 * 使用 updateMany 而非 update，因为使用 findUnique + update
 * 的单一记录更新模式有时会有潜在的时序问题。
 *
 * @param sub - Stripe Subscription 对象
 */
async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  await db.subscription.updateMany({
    where: { stripeSubscriptionId: sub.id },
    data: {
      status: "canceled",                     // 标记为已取消
      stripePriceId: null,                    // 清除价格方案（无订阅则无价格）
      stripeSubscriptionId: null,             // 清除订阅 ID（解除与 Stripe 的关联）
    },
  });
}
"""

filepath = '/Users/zhouming/Documents/mix/src/app/api/stripe/webhook/route.ts'
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('File written successfully')
