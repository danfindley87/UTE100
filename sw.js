const CACHE_NAME = 'ute100-tracker-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/course.geojson',
  '/config.js',
  'https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js',
  'https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if found (works offline)
        if (response) {
          return response;
        }
        // Otherwise, fetch from the network
        return fetch(event.request);
      })
  );
});
