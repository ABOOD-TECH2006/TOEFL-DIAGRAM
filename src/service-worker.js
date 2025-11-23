/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();
self.skipWaiting(); // تحديث الخدمة فورًا

// تحميل كل ملفات البناء
precacheAndRoute(self.__WB_MANIFEST);

// تفعيل التحديث مباشرة بدون انتظار إغلاق التابات
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim()); // ← التصحيح هنا
});

// توجيه كل صفحات التطبيق إلى index.html
registerRoute(({ request, url }) => {
  if (request.mode !== "navigate") return false;
  if (url.pathname.startsWith("/_")) return false;
  if (url.pathname.match(/\/[^/?]+\.[^/]+$/)) return false;
  return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"));

// كاش للصور
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"),
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

// كاش للـ JS / CSS / HTML
registerRoute(
  ({ request }) =>
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "document",
  new StaleWhileRevalidate()
);

// السماح للواجهة بأن تخبر SW بتنزيل التحديث الجديد فورًا
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
