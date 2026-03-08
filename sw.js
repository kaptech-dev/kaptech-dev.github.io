// Project: Kaptech Portfolio | File: sw.js | Description: Service Worker untuk Offline Caching & Ultra-Fast Loading
const CACHE_NAME = 'kaptech-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './privacy-policy.html',
  './style.css',
  './theme.css',
  './script.js',
  './favicon.ico',
  './app-ads.txt',
  './assets/android_icon_countertasbih.webp',
  './assets/android_icon_risesocial.webp',
  './assets/extention_icon_facebokkall.webp',
  './assets/extention_icon_ytpersonal.webp',
  './assets/extention_icon_ytall.webp',
  './assets/extention_icon_exporttiktok.webp',
  './assets/extention_icon_exportinstagram.webp',
  './assets/mql5_ea_BMAAutoEntryKaptech.webp',
  './assets/mql5_ea_autoRunAgresifBuyLayer.webp',
  './assets/mql5_ea_autoRunAgresifSellLayer.webp',
  './assets/mql5_ea_UniversalSLTPManager.webp',
  './assets/mql5_script_AutoCloseManager.webp'
];

// 1. INSTALL: Simpan semua aset ke cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Kaptech Cache: Memulai penyimpanan aset...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. ACTIVATE: Bersihkan cache lama jika ada update
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Kaptech Cache: Menghapus cache lama...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. FETCH: Ambil dari cache dulu, jika tidak ada baru ke network (Strategy: Cache First)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        // Opsional: Simpan aset baru yang di-fetch ke cache secara dinamis
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(() => {
      // Jika offline dan tidak ada di cache
      return caches.match('./index.html');
    })
  );
});
