const CACHE_VERSION = 'v2';
const CACHE_NAME = `fabiolas-${CACHE_VERSION}`;

// Aggiungiamo tutti i file necessari per le animazioni
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/assets/css/critical/main.css',
    '/assets/css/non-critical/styles.css',  // File minimizzato degli stili
    '/assets/js/main.min.js',
    '/assets/js/animations.min.js',  // File delle animazioni
    '/assets/js/slideshow.min.js',
    '/assets/js/cookie-manager.min.js',
    '/assets/js/sw-manager.min.js',
    '/assets/images/compressed/titlelogo.webp'
];

// Installazione Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
    );
});

// Strategie di caching
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        (async () => {
            try {
                // Prima prova a prendere una risposta aggiornata dalla rete
                const networkResponse = await fetch(event.request);
                const cache = await caches.open(CACHE_NAME);
                
                // Se la risposta è valida, aggiorna la cache
                if (networkResponse && networkResponse.status === 200) {
                    cache.put(event.request, networkResponse.clone());
                }
                
                return networkResponse;
            } catch (err) {
                // Se la rete fallisce, prova dalla cache
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) {
                    return cachedResponse;
                }
                throw err;
            }
        })()
    );
});

// Pulizia cache vecchie
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => cacheName.startsWith('fabiolas-') && cacheName !== CACHE_NAME)
                        .map(cacheName => caches.delete(cacheName))
                );
            })
    );
});