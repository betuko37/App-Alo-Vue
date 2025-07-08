// Service Worker para PWA
const CACHE_NAME = 'tareas-app-v1'
const urlsToCache = ['/', '/index.html', '/src/main.ts', '/src/App.vue']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Devuelve la respuesta cacheada si existe
      if (response) {
        return response
      }
      // Si no está en cache, hace la petición a la red
      return fetch(event.request)
    }),
  )
})
