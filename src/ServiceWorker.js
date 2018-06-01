this.addEventListener('install', (event) => {
    console.log('Service worker installed');
    event.waitUntil(caches.open('NEON-CACHE')
        .then((cache) => {
            // Upload in cache files
            return cache.addAll([
                '/',
                '/built/main.js',
                '/built/main.css',
                '/img/user-default.jpg',
                '/img/background.jpg',
                '/index.html',
            ]);
        }).catch((error) => {
            console.log(error);
        }));
});

this.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((cachedResponse) => {
        if (navigator.onLine) {
            return fetch(event.request);
        }
        // Get cache
        if (cachedResponse) {
            return cachedResponse;
        }
        return fetch(event.request);
    }));
});
