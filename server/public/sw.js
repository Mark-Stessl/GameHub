/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-e21a23a0'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/AboutView-0FlI0oYH.js",
    "revision": null
  }, {
    "url": "assets/AboutView-14-QIJ19.js",
    "revision": null
  }, {
    "url": "assets/AboutView-5hEtQmTO.js",
    "revision": null
  }, {
    "url": "assets/AboutView-71Ab2SS7.js",
    "revision": null
  }, {
    "url": "assets/AboutView-7MAq1XUa.js",
    "revision": null
  }, {
    "url": "assets/AboutView-AgZJ4Yir.js",
    "revision": null
  }, {
    "url": "assets/AboutView-bABYP75b.js",
    "revision": null
  }, {
    "url": "assets/AboutView-D5IkeqVQ.js",
    "revision": null
  }, {
    "url": "assets/AboutView-gSvqijAm.js",
    "revision": null
  }, {
    "url": "assets/AboutView-jD-978iU.js",
    "revision": null
  }, {
    "url": "assets/AboutView-QRL0oxew.js",
    "revision": null
  }, {
    "url": "assets/AboutView-QtVMz4eZ.js",
    "revision": null
  }, {
    "url": "assets/AboutView-RnN99isl.js",
    "revision": null
  }, {
    "url": "assets/AboutView-SAwZgft3.js",
    "revision": null
  }, {
    "url": "assets/AboutView-u81b5giZ.js",
    "revision": null
  }, {
    "url": "assets/AboutView-UBDaIyUj.js",
    "revision": null
  }, {
    "url": "assets/AboutView-uiQ2iQtO.js",
    "revision": null
  }, {
    "url": "assets/AboutView-y1yMOP3m.js",
    "revision": null
  }, {
    "url": "assets/AboutView-Y3R4IMf5.js",
    "revision": null
  }, {
    "url": "assets/HomeView--lcdvjDs.css",
    "revision": null
  }, {
    "url": "assets/HomeView--nh3Fc3u.js",
    "revision": null
  }, {
    "url": "assets/HomeView-21BcxHh7.js",
    "revision": null
  }, {
    "url": "assets/HomeView-5kfWRZTe.js",
    "revision": null
  }, {
    "url": "assets/HomeView-7A8Pgdhg.js",
    "revision": null
  }, {
    "url": "assets/HomeView-9Ipj-M_-.css",
    "revision": null
  }, {
    "url": "assets/HomeView-alI6xWwe.js",
    "revision": null
  }, {
    "url": "assets/HomeView-AR3WGW3D.js",
    "revision": null
  }, {
    "url": "assets/HomeView-csiepNJJ.css",
    "revision": null
  }, {
    "url": "assets/HomeView-D2Y1u58c.js",
    "revision": null
  }, {
    "url": "assets/HomeView-dhSoSoek.css",
    "revision": null
  }, {
    "url": "assets/HomeView-EmWAxBmP.js",
    "revision": null
  }, {
    "url": "assets/HomeView-FuqyvKV_.css",
    "revision": null
  }, {
    "url": "assets/HomeView-h99ROba3.js",
    "revision": null
  }, {
    "url": "assets/HomeView-IILSUwLQ.js",
    "revision": null
  }, {
    "url": "assets/HomeView-iKTrfaDX.css",
    "revision": null
  }, {
    "url": "assets/HomeView-j6ZNHctz.css",
    "revision": null
  }, {
    "url": "assets/HomeView-k3OYQC-X.css",
    "revision": null
  }, {
    "url": "assets/HomeView-kBh--o7h.js",
    "revision": null
  }, {
    "url": "assets/HomeView-ktA57CoV.css",
    "revision": null
  }, {
    "url": "assets/HomeView-l-lsq3p_.js",
    "revision": null
  }, {
    "url": "assets/HomeView-laSEEFia.css",
    "revision": null
  }, {
    "url": "assets/HomeView-Mel1BnTM.js",
    "revision": null
  }, {
    "url": "assets/HomeView-MgP-Sg0M.css",
    "revision": null
  }, {
    "url": "assets/HomeView-MiZYcoSW.js",
    "revision": null
  }, {
    "url": "assets/HomeView-O4lj1CMi.js",
    "revision": null
  }, {
    "url": "assets/HomeView-PezBHfX_.js",
    "revision": null
  }, {
    "url": "assets/HomeView-Qd0rjGCl.css",
    "revision": null
  }, {
    "url": "assets/HomeView-Qrx2l590.js",
    "revision": null
  }, {
    "url": "assets/HomeView-qVLXDvVe.js",
    "revision": null
  }, {
    "url": "assets/HomeView-riLIVORG.css",
    "revision": null
  }, {
    "url": "assets/HomeView-uFgFc6rc.css",
    "revision": null
  }, {
    "url": "assets/HomeView-uLrPDhIb.css",
    "revision": null
  }, {
    "url": "assets/HomeView-US7rz-_-.css",
    "revision": null
  }, {
    "url": "assets/HomeView-vbigf8E0.css",
    "revision": null
  }, {
    "url": "assets/HomeView-vWjWzd_F.js",
    "revision": null
  }, {
    "url": "assets/HomeView-xlA5WNuj.css",
    "revision": null
  }, {
    "url": "assets/HomeView-yrOixq8X.css",
    "revision": null
  }, {
    "url": "assets/index-3f6JRrPE.js",
    "revision": null
  }, {
    "url": "assets/index-5bze1qfa.js",
    "revision": null
  }, {
    "url": "assets/index-A1QD-tgD.js",
    "revision": null
  }, {
    "url": "assets/index-aJrDlpN0.js",
    "revision": null
  }, {
    "url": "assets/index-dkLlxt_R.js",
    "revision": null
  }, {
    "url": "assets/index-Eeb5WvGG.js",
    "revision": null
  }, {
    "url": "assets/index-ehZ8azqM.js",
    "revision": null
  }, {
    "url": "assets/index-JVJNlfgb.css",
    "revision": null
  }, {
    "url": "assets/index-k1Tl3ByS.js",
    "revision": null
  }, {
    "url": "assets/index-KhHS0oUE.js",
    "revision": null
  }, {
    "url": "assets/index-nzzcF7xI.js",
    "revision": null
  }, {
    "url": "assets/index-paUqeLPG.js",
    "revision": null
  }, {
    "url": "assets/index-pypPRKsT.js",
    "revision": null
  }, {
    "url": "assets/index-RUttoNMI.js",
    "revision": null
  }, {
    "url": "assets/index-sG5v6GV4.js",
    "revision": null
  }, {
    "url": "assets/index-uNL1pH20.js",
    "revision": null
  }, {
    "url": "assets/index-xnPDlsfT.js",
    "revision": null
  }, {
    "url": "assets/index-z_GuaWDy.js",
    "revision": null
  }, {
    "url": "assets/index-Z7M7QbcV.js",
    "revision": null
  }, {
    "url": "assets/index-zY4ZeM2r.js",
    "revision": null
  }, {
    "url": "css/all.min.css",
    "revision": "1d0218caf11ca43db70c71b5b3b9fb2d"
  }, {
    "url": "custom-service-worker.js",
    "revision": "a7661c805b24f1066c9074d1564b4036"
  }, {
    "url": "index.html",
    "revision": "1ed0348426bb29de64f0cd88dc633ffb"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "icons/web-app-manifest-192x192.png",
    "revision": "3bfff7606924dc4adeeddf9e77f18db0"
  }, {
    "url": "icons/web-app-manifest-512x512.png",
    "revision": "28cb73eb5c3832887ed83b3832ab58c1"
  }, {
    "url": "manifest.webmanifest",
    "revision": "a1e4e9831dadb8b2ba6b628954b50e3f"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute("/games", new workbox.NetworkFirst({
    "cacheName": "gamehub",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 86400
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
