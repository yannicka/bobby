if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return r[e]||(c=new Promise(async c=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=c}else importScripts(e),c()})),c.then(()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]})},c=(c,r)=>{Promise.all(c.map(e)).then(e=>r(1===e.length?e[0]:e))},r={require:Promise.resolve(c)};self.define=(c,b,d)=>{r[c]||(r[c]=Promise.resolve().then(()=>{let r={};const i={uri:location.origin+c.slice(1)};return Promise.all(b.map(c=>{switch(c){case"exports":return r;case"module":return i;default:return e(c)}})).then(e=>{const c=d(...e);return r.default||(r.default=c),r})}))}}define("./service-worker.js",["./workbox-468c4d03"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"7ff4cd8bde819c245725fc7bd2aa13c5.png",revision:"ea571d00eeb9f735aba5ea67a58e7324"},{url:"app-00fa2a71da926ed8e31d.js",revision:"d8dab2006012da4b75cfe2d6b9bb44a0"},{url:"b2040711e41243c1d0d633d0da9e73e7.png",revision:"fe26706d19ee321e19f3b2f7dcf42276"},{url:"d97d7a9c3693111bc7afc3f0d2c0d00f.png",revision:"c7faf276b79e7015e58dcddac2bb891a"},{url:"favicon.png",revision:"32d7c5b360704b3cb75bdeabad678bd9"},{url:"icon_128x128.3366eb90b0456e3acb3ec5bfcc475be9.png",revision:"3366eb90b0456e3acb3ec5bfcc475be9"},{url:"icon_192x192.7d4b4c4c2a0e7d573d9090552f6a53ee.png",revision:"7d4b4c4c2a0e7d573d9090552f6a53ee"},{url:"icon_256x256.952d9587fe7efa18d92629ef8f5dbf86.png",revision:"952d9587fe7efa18d92629ef8f5dbf86"},{url:"icon_384x384.8e839b784074f293079590ed79858ac4.png",revision:"8e839b784074f293079590ed79858ac4"},{url:"icon_512x512.c3d0e123e4b7b05bd8abf4c55b16a17b.png",revision:"c3d0e123e4b7b05bd8abf4c55b16a17b"},{url:"icon_96x96.7b066309b33714645f7cf057930c446f.png",revision:"7b066309b33714645f7cf057930c446f"},{url:"index.html",revision:"3447d54b7114b64d341c2a1ec7a03701"},{url:"manifest.0efbb9056318c56bfc15cc2be9f0a863.json",revision:"0efbb9056318c56bfc15cc2be9f0a863"},{url:"sw.js",revision:"f7a3d79e412d90ac935ed41fcf234d70"}],{})}));