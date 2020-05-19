import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Navigation from "./components/AppBar.vue";
import Modal from "./components/Modal.vue";

Vue.component("app-nav", Navigation);
Vue.component("app-modal", Modal);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
