import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/tools/:tool?",
        name: "Tools",
        meta: {
            title: "כלי עזר",
            description: "כלי עזר לנוחיות מתנדבים",
        },
        component: () => import("../views/Tools.vue"),
    },
    {
        path: "/moked/:page",
        name: "Moked",
        meta: {
            title: "דיווחים למוקד",
            description: "עמוד שליחת דיווחים למוקד",
        },
        component: () => import("../views/Moked.vue"),
    },
    {
        path: "/contact",
        name: "Contact",
        meta: {
            title: "יצירת קשר",
            description: "עמוד יצירת קשר עם מפתחי האתר",
        },
        component: () => import("../views/Contact.vue"),
    },
    {
        path: "/info",
        name: "Info",
        meta: {
            title: "אודות",
            description: "אודות האתר והאפליקציה",
        },
        component: () => import("../views/Info.vue"),
    },
    {
        path: "/privacy",
        name: "Privacy",
        meta: {
            title: "מדיניות פרטיות",
            description: "מדיניות הפרטיות של האתר והאפליקציה",
        },
        component: () => import("../views/Privacy.vue"),
    },
    {
        path: "/play",
        name: "Play",
        beforeEnter(_to, _from, next) {
            window.open("https://play.google.com/store/apps/details?id=atlow.chemi.mymada", "_blank");
            next(false);
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
