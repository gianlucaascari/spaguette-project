const CACHE_NAME = "spaguette-cache-v1";
const STATIC_HTML = [
  "/",
  "/index.html",
  "/sign-in",
  "/sign-up",
  "/recipe-page",
  "/plan-page",
  "ingredients-page",
  "/+not-found.html",
  "/assets/manifest.json",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/_expo/static/js/web/entry-cad06ec382d49e56fee571ea44c537b7.js",
];

// 🟢 Install Event: Caches static assets
self.addEventListener("install", (event) => {
    console.log("[SW] Installing service worker...");
  
    event.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        for (const asset of STATIC_HTML) {
          try {
            const response = await fetch(asset);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            await cache.put(asset, response);
            console.log(`[SW] Cached HTML: ${asset}`);
          } catch (error) {
            console.error(`[SW] Failed to cache HTML: ${asset}`, error);
          }
        }
      })
    );
  });

// // 🟡 Fetch Event: Cache-first for static assets, Network-first for HTML
// self.addEventListener("fetch", (event) => {
//     const { request } = event;
  
//     console.log(`[SW] Fetching: ${request.url} (mode: ${request.mode})`);
  
//     // Network-first strategy for HTML pages
//     if (request.mode === "navigate") {
//       console.log("[SW] Network-first strategy for:", request.url);
  
//       event.respondWith(
//         fetch(request)
//           .then((response) => {
//             console.log("[SW] Fetched from network:", request.url);
  
//             return caches.open(CACHE_NAME).then((cache) => {
//               cache.put(request, response.clone()); // Cache the latest version
//               console.log("[SW] Updated cache for:", request.url);
//               return response;
//             });
//           })
//           .catch(async (error) => {
//             console.warn("[SW] Network failed, trying cache:", request.url, error);
//             const cachedResponse = await caches.match(request);
//             if (cachedResponse) {
//               console.log("[SW] Returning cached version of:", request.url);
//               return cachedResponse;
//             } else {
//               console.error("[SW] No cached version found for:", request.url);
//             }
//           })
//       );
//       return;
//     }
  
//     // Cache-first strategy for static assets
//     console.log("[SW] Cache-first strategy for:", request.url);
//     event.respondWith(
//       caches.match(request).then(async (cachedResponse) => {
//         if (cachedResponse) {
//           console.log("[SW] Returning cached asset:", request.url);
//           return cachedResponse;
//         } else {
//           console.log("[SW] Fetching from network:", request.url);
//           return fetch(request);
//         }
//       })
//     );
//   });  

// 🔴 Activate Event: Cleans up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});
