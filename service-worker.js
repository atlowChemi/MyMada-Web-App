importScripts("/MyMada-Web-App/precache-manifest.49beebf9743bde16ef84b5599203ad9e.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        skipWaiting();
    }
});

workbox.setConfig({
    debug: false,
});

// workbox.skipWaiting();
// workbox.clientsClaim();

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    })
);
workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    workbox.strategies.cacheFirst({
        cacheName: "googleapis",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30,
            }),
        ],
    })
);

