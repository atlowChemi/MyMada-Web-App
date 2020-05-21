import Vue from "vue";
import Vuex from "vuex";

import { IRootState } from "../utils/types";
import { alert } from "./alert.module";
import { user } from "./user.module";
import { settings } from "./settings.module";

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
    state: {
        packageVersion: process.env.PACKAGE_VERSION || "0",
    },
    mutations: {},
    actions: {},
    modules: {
        alert,
        user,
        settings,
    },
    getters: {
        appVersion: state => state.packageVersion,
    },
});
