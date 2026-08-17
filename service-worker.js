// Owsis — minimal service worker.
// Just enough offline caching to make the app installable ("Add to Home
// Screen" / the browser's install icon) and to let it open once more
// without a network connection. Bump CACHE_NAME whenever app files change
// so returning visitors pick up the new version instead of a stale copy.

const CACHE_NAME = "owsis-cache-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192x192.png",
  "./icon-512x512.png",
  "./favicon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Network-first for navigation requests (so users get fresh content when
// online), falling back to the cached app shell when offline.
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
