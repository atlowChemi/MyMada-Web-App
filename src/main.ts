import Vue from "vue";
import Waves from "vue-waves-effect";
import { MdButton, MdCard, MdField, MdRipple } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Navigation from "./components/AppBar.vue";
import Button from "./components/Button.vue";

Vue.component("app-nav", Navigation);
Vue.component("app-btn", Button);
Vue.use(Waves);
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdField);
Vue.use(MdRipple);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
