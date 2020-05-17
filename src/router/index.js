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
        path: "/info",
        name: "Info",
        meta: {
            title: 'אודות'
        },
        component: () => import("../views/Info.vue")
    },
    {
        path: "/privacy",
        name: "Privacy",
        meta: {
            title: 'פרטיות'
        },
        component: () => import("../views/Privacy.vue")
    },
    {
        path: "/play",
        name: "Play",
        beforeEnter(_to, _from, next) {
            window.open(
                "https://play.google.com/store/apps/details?id=atlow.chemi.mymada",
                "_blank"
            );
            next(false);
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
