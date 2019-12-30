importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

let sName="service-worker.js";

console.log(`SHEMP: Hello, Moe, from ${sName}...!`);

if (workbox) {
  console.log(`${sName}: Yay! Workbox is loaded 🎉`);
} else {
  console.log(`${sName}: Boo! Workbox didn't load 😬`);
}
