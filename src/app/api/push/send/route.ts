import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import webpush from "web-push";

// Configure web-push with VAPID details
const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;

if (publicKey && privateKey) {
  webpush.setVapidDetails(
    "mailto:admin@fikadigi.store",
    publicKey,
    privateKey
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, message, url, icon } = body;

    if (!title || !message) {
      return NextResponse.json(
        { error: "Title and message are required" },
        { status: 400 }
      );
    }

    // 1. Fetch all subscriptions from the database
    const subscriptions = await prisma.pushSubscription.findMany();

    if (subscriptions.length === 0) {
      return NextResponse.json({ success: true, sentCount: 0, message: "No subscribers found" });
    }

    const payload = JSON.stringify({
      title,
      body: message,
      url: url || "/",
      icon: icon || "/icon.jpg"
    });

    let successCount = 0;
    let failedCount = 0;

    // 2. Broadcast to all active subscribers in parallel
    const sendPromises = subscriptions.map(async (sub) => {
      const pushSub = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth
        }
      };

      try {
        await webpush.sendNotification(pushSub, payload);
        successCount++;
      } catch (error: any) {
        failedCount++;
        // If the endpoint is expired, gone (410), or not found (404), prune it from the DB
        if (error.statusCode === 410 || error.statusCode === 404) {
          console.log(`Pruning expired push subscription: ${sub.id}`);
          await prisma.pushSubscription.delete({
            where: { id: sub.id }
          }).catch((err) => console.error("Error deleting expired subscription:", err));
        } else {
          console.error(`Failed to send push notification to subscription ${sub.id}:`, error);
        }
      }
    });

    await Promise.all(sendPromises);

    return NextResponse.json({
      success: true,
      totalCount: subscriptions.length,
      sentCount: successCount,
      failedCount: failedCount
    });
  } catch (error: any) {
    console.error("Error broadcasting push notification:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
