/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
            console.log("App is being served from cache by a service worker.\n" + "For more details, visit https://goo.gl/AFskqB");
        },
        registered() {
            console.log("Service worker has been registered.");
        },
        cached() {
            console.log("Content has been cached for offline use.");
        },
        updatefound() {
            console.log("New content is downloading.");
        },
        updated(reg) {
            console.log("New content is available; please refresh.");
            if (!reg || !reg.waiting) return;
            reg.waiting.postMessage({ type: "SKIP_WAITING" });
            document.dispatchEvent(new CustomEvent("SW_CacheUpdated"));
        },
        offline() {
            console.log("No internet connection found. App is running in offline mode.");
        },
        error(error) {
            console.error("Error during service worker registration:", error);
        },
    });
}
