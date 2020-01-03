'use strict';

let sName="service-worker.js";
console.log(`SHEMP: Hello, Moe, from ${sName}...!`);

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/scrumi-react/offline.html'
];

self.addEventListener('install', (evt) => {
  console.log(`${sName}: [ServiceWorker] Install`);

  // CODELAB: Precache static resources here.
  evt.waitUntil(
	caches.open(CACHE_NAME)
    .then((cache)=>{
		console.log(`${sName}: [Service Worker] pre-caching FILES_TO_CACHE = `, FILES_TO_CACHE );
		return cache.addAll(FILES_TO_CACHE);	
	})
  );

  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log(`${sName}: [ServiceWorker] Activate`);

  // CODELAB: Remove previous cached data from disk.
  //
  // => https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil
  // The extendableEvent.waitUntil() method tells the event dispatcher that work is ongoing.
  // It can also be used to detect whether that work was successful. In service workers,
  // waitUntil() tells the browser that work is ongoing until the promise settles, and
  // it shouldn't terminate the service worker if it wants that work to complete.
  // 
  // => The updated service worker takes control immediately because our install event finishes
  // with self.skipWaiting(), and the activate event finishes with self.clients.claim().
  // Without those, the old service worker would continue to control the page as long as there
  // is a tab open to the page.
  //
  evt.waitUntil(
	 caches.keys()
	 .then((keyList)=>{
		return Promise.all(
            keyList.map((key) => {
				if(key !== CACHE_NAME){
					console.log(`${sName}: [ServiceWorker] Removing old cache with key "${key}" cuz it doesn't equal CACHE_NAME = "${CACHE_NAME}"...`);
					return caches.delete(key);
				}
            })/* map() */
        )/* Promise.all() */
	 }) /* .then */ 
  ); /* evt.waitUntil */

  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log(`${sName}: [ServiceWorker] Fetch url = `, evt.request.url);

  // CODELAB: Add fetch event handler here.
  //
  // => And finally, we need to handle fetch events. We're going to use a
  // [Network falling back to cache]
  // (https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache)
  // strategy.
  // The service worker first tries to fetch the resource from the network.
  // If that fails, the service worker returns the offline page from the cache,
  // avoiding Chrome's "offline" dinosaur...
  //
  // => Wrapping the fetch() call in evt.respondWith() prevents the browsers default fetch
  //    handling and tells the browser we want to handle the response ourselves.
  //    If you don't call evt.respondWith() inside of a `fetch` handler,
  //    you'll just get the default network behavior (Chrome's "offline" dinosaur if you're
  //    offline, I presume)...
  //
  // => The `fetch` handler only needs to handle page navigations,
  //    so other requests can be dumped out of the handler and
  //    dealt with normally by the browser.
  //
  // => Use fetch to try to get the item from the network. If it fails,
  //    the catch handler opens the cache with caches.open(CACHE_NAME) and uses
  //    cache.match('offline.html') to get the precached offline page. The
  //    result is then passed back to the browser using evt.respondWith(). 
  if(evt.request.mode !== 'navigate'){
	// Not a page navigation, bail...
    return;
  }

  evt.respondWith(  
	fetch(evt.request)
    .catch((err)=>{
		console.log(`${sName}: Caught an error fetching evt.request.url = "${evt.request.url}"...so serving up the offline page...`);
		return caches.open(CACHE_NAME)
          .then((cache)=>{
			 return cache.match('/scrumi-react/offline.html')
	  	  });
	})/* .catch() */
  );
  
});
