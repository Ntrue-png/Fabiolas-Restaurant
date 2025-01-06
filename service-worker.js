const CACHE_VERSION = 'v2';
const CACHE_NAME = `fabiolas-${CACHE_VERSION}`;

// Aggiungiamo tutti i file necessari per le animazioni
const PRECACHE_URLS = [
    '/',
    '/index.html?version=1.0',
    '/assets/css/critical/main.css?version=1.0',
    '/assets/css/non-critical/styles.css?version=1.0',
    '/assets/js/main.min.js?version=1.0',
    '/assets/js/animations.min.js?version=1.0',
    '/assets/js/slideshow.min.js?version=1.0',
    '/assets/js/cookie-manager.min.js?version=1.0',
    '/assets/js/sw-manager.min.js?version=1.0',
    '/assets/images/compressed/titlelogo.webp?version=1.0',
    '/pages/restaurant.html?version=1.0',
    '/pages/offline.html?version=1.0',
    '/pages/menu.html?version=1.0',
    '/pages/event.html?version=1.0',
    '/pages/datenschutz.html?version=1.0',
    '/pages/cookies.html?version=1.0',
    '/pages/contact.html?version=1.0',
    '/assets/css/critical/restaurant-critical.css?version=1.0',
    '/assets/css/critical/menu-critical.css?version=1.0',
    '/assets/css/critical/event-critical.css?version=1.0',
    '/assets/css/critical/datenschutz-critical.css?version=1.0',
    '/assets/css/critical/cookie-critical.css?version=1.0',
    '/assets/css/critical/contact-critical.css?version=1.0',
    '/assets/css/non-critical/restaurant-non-critical.css?version=1.0',
    '/assets/css/non-critical/menu-non-critical.css?version=1.0',
    '/assets/css/non-critical/event-non-critical.css?version=1.0',
    '/assets/css/non-critical/datenschutz-non-critical.css?version=1.0',
    '/assets/css/non-critical/cookie-non-critical.css?version=1.0',
    '/assets/css/non-critical/contact-non-critical.css?version=1.0',
    '/assets/js/critical/restaurant-critical.js?version=1.0',
    '/assets/js/critical/menu-critical.js?version=1.0',
    '/assets/js/critical/hamburger.js?version=1.0',
    '/assets/js/critical/event-critical.js?version=1.0',
    '/assets/js/critical/datenschutz-critical.js?version=1.0',
    '/assets/js/critical/cookies-critical.js?version=1.0',
    '/assets/js/critical/contact-critical.js?version=1.0',
    '/assets/js/non-critical/restaurant-non-critical.js?version=1.0',
    '/assets/js/non-critical/non-critical.js?version=1.0',
    '/assets/js/non-critical/menu-non-critical.js?version=1.0',
    '/assets/js/non-critical/faq.js?version=1.0',
    '/assets/js/non-critical/event-non-critical.js?version=1.0',
    '/assets/js/non-critical/datenschutz-non-critical.js?version=1.0',
    '/assets/js/non-critical/cookies-non-critical.js?version=1.0',
    '/assets/js/non-critical/contact-form.js?version=1.0'
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
