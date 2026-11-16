/* Grinchtaffy LiveChat — notification click routing and optional Firebase push (2026-11-15).
 * No private message bodies are cached or sent in push payloads.
 * Host at /livechat/livechat-notification-sw.js for scope /livechat/.
 */
'use strict';
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    const app = new URL('/livechat/', self.location.origin);
    const schedule = event.notification.data?.schedule === true;
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

// Firebase data-only push. Do not expose message text or sender identity on lock screens.
try {
  importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js','https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js');
  firebase.initializeApp({
            apiKey: "AIzaSyBjQ4F-UhswfcW634XUcNqDf3DE0a8O68I",
            authDomain: "chatapp-b0c63.firebaseapp.com",
            databaseURL: "https://chatapp-b0c63-default-rtdb.firebaseio.com",
            projectId: "chatapp-b0c63",
            storageBucket: "chatapp-b0c63.firebasestorage.app",
            messagingSenderId: "920353833960",
            appId: "1:920353833960:web:051f63d23a96b8985f1a5d"
        });
  firebase.messaging().onBackgroundMessage(async payload => {
    const d=payload.data||{};
    const cache=await caches.open('lc-push-device-v1');
    const marker=await cache.match(new URL('/livechat/.push-device',self.location.origin).href);
    if(!marker||await marker.text()!==d.uid)return;
    await self.registration.showNotification('LiveChat',{body:'You have a new message.',icon:'/livechat/livechat-icon-192.png',tag:'lc-push-'+d.key,data:{key:''}});
  });
} catch(e) { console.warn('Optional FCM push unavailable:',e.message); }
