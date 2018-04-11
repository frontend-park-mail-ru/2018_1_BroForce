this.addEventListener('install', (event) => {
    console.log('Service worker installed');
    event.waitUntil(caches.open('NEON-CACHE')
        .then((cache) => {
            // загружаем в наш cache необходимые файлы
            return cache.addAll([
                '/',
                '/index.html',
                'index.js',
                '/css/form.css',
                '/img/user-default.jpg',
            ]);
        }).catch((error) => {
            console.log(error);
        }));
});

this.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((cachedResponse) => {
            // выдаём кэш, если он есть
            if (cachedResponse) {
                return cachedResponse;
            }

            // иначе запрашиваем из сети как обычно
            return fetch(event.request);
        }));
});
