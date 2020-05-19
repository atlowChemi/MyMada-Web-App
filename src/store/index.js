import Vue from "vue";
import Vuex from "vuex";

import { alert } from "./alert.module";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        packageVersion: process.env.PACKAGE_VERSION || "0"
    },
    mutations: {},
    actions: {},
    modules: {
        alert
    },
    getters: {
        appVersion: state => state.packageVersion
    }
});
