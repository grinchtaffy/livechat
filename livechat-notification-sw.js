/* Grinchtaffy LiveChat — notification click routing only (2026-11-10b).
 * This service worker does not implement push delivery or cache private messages.
 * Host at /livechat/livechat-notification-sw.js for scope /livechat/.
 */
'use strict';
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    const app = new URL('/livechat/', self.location.origin);
    const key = typeof event.notification.data?.key === 'string'
      ? event.notification.data.key.slice(0, 128) : '';
    const list = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const livechat = list.find(client => {
      try {
        const url = new URL(client.url);
        return url.origin === app.origin && url.pathname.startsWith(app.pathname);
      } catch (_) { return false; }
    });
    if (livechat) {
      await livechat.focus();
      livechat.postMessage({ type: 'livechat-notification-click', key });
    } else if (self.clients.openWindow) {
      await self.clients.openWindow(app.href);
    }
  })());
});
