// This handles push notifications
self.addEventListener('push', function (event) {
    if (event.data) {
      const data = event.data.json()
      const options = {
        body: data.body,
        icon: data.icon || '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: '2',
        },
      }
      event.waitUntil(self.registration.showNotification(data.title, options))
    }
  })
  
  // Handle notification clicks
  self.addEventListener('notificationclick', function (event) {
    event.notification.close()
    event.waitUntil(clients.openWindow('/'))
  })
  
  // Add caching for offline support
  const CACHE_NAME = 'phx-write-cache-v1'
  const OFFLINE_URL = '/offline.html'
  
  // Files to cache
  const ASSETS_TO_CACHE = [
    '/',
    '/offline.html',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/manifest.json'
  ]
  
  // Install event
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(ASSETS_TO_CACHE))
        .then(() => self.skipWaiting())
    )
  })
  
  // Fetch event for offline support
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse
              }
              // For navigation requests, return the offline page
              if (event.request.mode === 'navigate') {
                return caches.match(OFFLINE_URL)
              }
              return new Response('Network error happened', {
                status: 408,
                headers: { 'Content-Type': 'text/plain' }
              })
            })
        })
    )
  })