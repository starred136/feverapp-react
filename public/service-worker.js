const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  "/manifest.json",
];

// Install service worker
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate new SW immediately
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName); // Clear old cache
        })
      );
    })
  );
  self.clients.claim(); // Take control immediately
});


// Fetch cached content
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).then((response) => {
      return caches.open('dynamic-cache').then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});

// Update service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
