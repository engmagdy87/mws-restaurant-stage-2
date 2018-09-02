const newCacheName = "restaurants-v3";

//  install new cache
self.addEventListener("install", function(event) {
  //  files to be cached
  let urlsToCache = [
    "/",
    "index.html",
    "restaurant.html",
    "css/styles.css",
    "img/normal/1.webp",
    "img/normal/2.webp",
    "img/normal/3.webp",
    "img/normal/4.webp",
    "img/normal/5.webp",
    "img/normal/6.webp",
    "img/normal/7.webp",
    "img/normal/8.webp",
    "img/normal/9.webp",
    "img/normal/10.webp",
    "img/small/1.webp",
    "img/small/2.webp",
    "img/small/3.webp",
    "img/small/4.webp",
    "img/small/5.webp",
    "img/small/6.webp",
    "img/small/7.webp",
    "img/small/8.webp",
    "img/small/9.webp",
    "img/small/10.webp",
    "js/httpHelper.js",
    "js/idb.js",
    "js/main.js",
    "js/restaurant_info.js",
    "manifest.json"
  ];

  //  create cache and add all files to it
  event.waitUntil(
    caches.open(newCacheName).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

//  fetch data
self.addEventListener("fetch", function(event) {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith("/restaurant.html")) {
    event.respondWith(
      caches
        .match("restaurant.html")
        .then(response => response || fetch(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    })
  );
});

//  delete old cache as new data fetched
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(
            cacheName =>
              cacheName.startsWith("restaurants") && cacheName !== newCacheName
          )
          .map(cacheName => cache.delete(cacheName))
      );
    })
  );
});
