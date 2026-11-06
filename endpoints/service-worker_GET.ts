import { schema } from "./service-worker_GET.schema";

const swCode = `
const CACHE_NAME = "lic-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // It will cache root and manifest. Use catch to ignore if files are temporarily unavailable.
      return cache.addAll(["/", "/manifest.json"]).catch(err => console.warn('Cache addAll failed', err));
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  
  // Only handle same-origin requests
  if (url.origin !== location.origin) return;
  
  // Skip API calls
  if (url.pathname.startsWith("/_api")) return;

  // Network-first strategy
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response if it's a valid basic response
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache on network failure
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          throw new Error('Network request failed and no cache available');
        });
      })
  );
});
`;

export async function handle(request: Request) {
  try {
    // Return the raw JS code as text with proper service worker headers
    return new Response(swCode.trim(), {
      status: 200,
      headers: {
        "Content-Type": "application/javascript",
        "Service-Worker-Allowed": "/",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(message, { status: 500 });
  }
}