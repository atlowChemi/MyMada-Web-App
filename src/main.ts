import Vue from "vue";
import Waves from "vue-waves-effect";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Navigation from "./components/AppBar.vue";
import Button from "./components/Button.vue";

Vue.component("app-nav", Navigation);
Vue.component("app-btn", Button);
Vue.use(Waves)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
