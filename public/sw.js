const CACHE_NAME = 'myanmar-proverbs-data-v2';

// Only cache the data file - never cache hashed JS/CSS
const DATA_URL = '/proverbs_data.json';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache only the big data file
      return cache.add(DATA_URL);
    }).catch(() => {
      // Silently fail on install - don't block the page
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Remove ALL old caches
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only intercept the data JSON file
  if (url.pathname.endsWith('proverbs_data.json')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        }).catch(() => {
          // Ignore network errors
        });
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // For all other requests (HTML, CSS, JS): let browser handle normally
  // Do NOT intercept - prevents hash filename conflicts
});
