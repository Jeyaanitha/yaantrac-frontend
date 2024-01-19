const staticCaches = 'site-static-v1';
const dynamicCaches = 'site-dynamic-v1';
const urlsToCache = ['index.html', '../src/views/components/loaders/Loader.jsx'];

const limitCacheSize = (name, size) => {
  caches.open(dynamicCaches).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCaches).then(cache => {
      cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return (
        cachedResponse ||
        fetch(event.request)
          .then(async networkResponse => {
            return caches.open(dynamicCaches).then(cache => {
              cache.put(event.request.url, networkResponse.clone());
              limitCacheSize(dynamicCaches, 200);
              return networkResponse;
            });
          })
          .catch(async () => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(caches.match('../src/views/components/loaders/Loader.jsx'));
              }, 60000);
            }).then(() => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(
                    new Response(
                      '<h1 style="text-align: center;">No Internet Connection</h1>',
                      {
                        headers: { 'Content-Type': 'text/html' }
                      }
                    )
                  );
                }, 1000);
              });
            });
          })
      );
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCaches && key !== dynamicCaches)
          .map(key => caches.delete(key))
      );
    })
  );
});
