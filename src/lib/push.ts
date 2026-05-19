function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function registerAndSubscribe() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Push notifications are not supported on this browser.");
    return null;
  }

  try {
    // 1. Register Service Worker
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/"
    });
    console.log("Service Worker registered successfully:", registration);

    // 2. Get public VAPID key
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!publicKey) {
      console.error("Public VAPID key is missing in environment variables.");
      return null;
    }

    // 3. Request subscription
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    };

    const subscription = await registration.pushManager.subscribe(subscribeOptions);
    console.log("Browser push subscription generated:", subscription);

    return subscription;
  } catch (error) {
    console.error("Failed to register Service Worker or subscribe to push notifications:", error);
    throw error;
  }
}

export async function getActiveSubscription() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  } catch (error) {
    console.error("Error checking push subscription status:", error);
    return null;
  }
}
