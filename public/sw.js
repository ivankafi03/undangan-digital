self.addEventListener('push', function (event) {
  if (event.data) {
    try {
      const data = event.data.json();
      const options = {
        body: data.body || 'Ada update terbaru dari FikaDigi!',
        icon: data.icon || '/icon.jpg',
        badge: '/icon.jpg',
        vibrate: [100, 50, 100],
        data: {
          url: data.url || '/'
        }
      };
      event.waitUntil(
        self.registration.showNotification(data.title || 'FikaDigi', options)
      );
    } catch (e) {
      // Fallback if data is not JSON
      const text = event.data.text();
      const options = {
        body: text,
        icon: '/icon.jpg',
        badge: '/icon.jpg',
        vibrate: [100, 50, 100],
        data: {
          url: '/'
        }
      };
      event.waitUntil(
        self.registration.showNotification('FikaDigi', options)
      );
    }
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // If a window is already open, focus it
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new window
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
