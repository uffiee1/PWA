const cacheName="PWA_CACHE_V1";
const appFiles=[
	"manifest.json",
  //"./",
  //"index.html",
  "offline.html",
	"js/scripts.js",
	"css/stylesheet.css",
	"images/icons/icon-72x72.png",
  "images/icons/icon-96x96.png",
  "images/icons/icon-128x128.png",
  "images/icons/icon-144x144.png",
  "images/icons/icon-152x152.png",
  "images/icons/icon-192x192.png",
  "images/icons/icon-384x384.png",
  "images/icons/icon-512x512.png",
  "images/bg1.jpg",
  "images/favicon.ico"
];

self.addEventListener("install",(installing)=>{
  console.log("Service Worker: I am being installed, Hello World!");
  
  //Put important offline files in cache on installation of the service worker
  installing.waitUntil(
  caches.open(cacheName).then((cache)=>{
    console.log("Service Worker: Caching important offline files");
    return cache.addAll(appFiles);
  })
);
});

self.addEventListener("activate",(activating)=>{	
  console.log("Service Worker: All systems online, ready to go!");
});

self.addEventListener("fetch",(fetching)=>{   
  console.log("Service Worker: User threw a ball, I need to fetch it!");

  fetching.respondWith(
    caches.match(fetching.request.url).then((response)=>{
      console.log("Service Worker: Fetching resource "+fetching.request.url);
      return response||fetch(fetching.request).then((response)=>{
        console.log("Service Worker: Resource "+fetching.request.url+" not available in cache");
        return caches.open(cacheName).then((cache)=>{
            console.log("Service Worker: Caching (new) resource "+fetching.request.url);
            //cache.put(fetching.request,response.clone());
          return response;
        });
      }).catch(function(){      
        console.log("Service Worker: Fetching online failed, HAALLPPPP!!!");
        //Do something else with the request (respond with a different cached file)
        if(fetching.request.mode === "navigate"){
          return caches.match("offline.html")
        }
      })
    })
  );

});

self.addEventListener("push",(pushing)=>{
	console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
})
