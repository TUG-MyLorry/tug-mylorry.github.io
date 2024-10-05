'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "4c3bf24d47dddec243bc0bdeb0c12846",
"version.json": "2ec012e61205f5affe5a6a1888324efe",
"index.html": "19d656ec9ff13b71650af1183e8803c2",
"/": "19d656ec9ff13b71650af1183e8803c2",
"main.dart.js": "20956e62823d27c978501d935036a4af",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "d07037e3053ed2af3346e76c7bc88b32",
"assets/AssetManifest.json": "2ff2c4092ac17876f39ee71982523bef",
"assets/NOTICES": "01f21977e6fe26dd85e64185dd98a6a6",
"assets/FontManifest.json": "28e4bf2d4c838e6f490df528e1822193",
"assets/AssetManifest.bin.json": "7b8bfcfe1849d45753c23f5a9a93a437",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "bd7ed8b0dfc527436bee955c21eb3536",
"assets/fonts/inter/Inter.ttf": "0a77e23a8fdbe6caefd53cb04c26fabc",
"assets/fonts/inter/Inter-Italic.ttf": "6dce17792107f0321537c2f1e9f12866",
"assets/fonts/MaterialIcons-Regular.otf": "0e6b016990cf441cfe619c31ae763c16",
"assets/assets/images/forgot_password.png": "395ddc9a23a4b6833b2e97c0066beb69",
"assets/assets/images/login_banner.png": "d3e464c43e1e4179bd565f828b889a55",
"assets/assets/images/driver_photo_placeholder.png": "1ad1dfeab7c1110bf4cd77003c24ee53",
"assets/assets/images/driver.png": "c27fd49cab2c9b4f3e5c06b7c7714f38",
"assets/assets/images/driver_photo_uploaded.png": "2347c3ad3be2e867f53231642917e07d",
"assets/assets/images/mileage_photo_placeholder.png": "18499693d1d721a0b8569e043e041d3f",
"assets/assets/images/icons/ic_bottom_bar_account.svg": "80a871831fb4be67a1eba070c33ff02b",
"assets/assets/images/icons/ic_x.svg": "e2c3020514825062bad68039ddc5d1a0",
"assets/assets/images/icons/ic_bottom_bar_tasks.svg": "8b27a1a6305ff5be762438d9fed47946",
"assets/assets/images/icons/ic_qr.svg": "d977997c55b61e9176c9ff62cdc82def",
"assets/assets/images/icons/ic_close.svg": "18fedded6d94f981818224f89df33e18",
"assets/assets/images/icons/ic_language.svg": "3ce5de9573419365612cc6bede410b47",
"assets/assets/images/icons/ic_show.svg": "dfd315b97bba913e346172007dcb1bfb",
"assets/assets/images/icons/ic_google.svg": "fca28056d4345e0a3e3acd44e1324ef0",
"assets/assets/images/icons/ic_bottom_bar_check_in.svg": "6656614607a80cf19fc8ea4221b167f9",
"assets/assets/images/icons/ic_warning.svg": "e01c4b53792c8fd1ff5d2d7ef729af7d",
"assets/assets/images/icons/ic_arrow_down.svg": "5fa5842ef243b99d93c8fa30f585471f",
"assets/assets/images/icons/ic_notif.svg": "edba70819ab6c7fe31ea86db57b1729f",
"assets/assets/images/icons/ic_hide.svg": "0563409965db25840078b689b9bfc124",
"assets/assets/images/icons/ic_search.svg": "94f3e6cb13127c9e4fbe79f37e2623c8",
"assets/assets/images/icons/ic_change_photo.svg": "b76b12439afffc6ca15a97bb00ddf351",
"assets/assets/images/icons/ic_drag_handle.svg": "ada5495abcb65e4ce1f421b43c218fd2",
"assets/assets/images/app_logo.png": "96f56c80d1ccf479de7e898b4e1d260d",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
