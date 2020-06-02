import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import i18n from "@/i18n";

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
            title: i18n.t("tools-page.name"),
            description: i18n.t("tools-page.desc"),
        },
        component: () => import("../views/Tools.vue"),
    },
    {
        path: "/moked/:page",
        name: "Moked",
        meta: {
            title: i18n.t("moked-page.name"),
            description: i18n.t("moked-page.desc"),
        },
        component: () => import("../views/Moked.vue"),
    },
    {
        path: "/contact",
        name: "Contact",
        meta: {
            title: i18n.t("contact-page.name"),
            description: i18n.t("contact-page.desc"),
        },
        component: () => import("../views/Contact.vue"),
    },
    {
        path: "/info",
        name: "Info",
        meta: {
            title: i18n.t("info-page.name"),
            description: i18n.t("info-page.desc"),
        },
        component: () => import("../views/Info.vue"),
    },
    {
        path: "/privacy",
        name: "Privacy",
        meta: {
            title: i18n.t("privacy-page.name"),
            description: i18n.t("privacy-page.desc"),
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
