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
        selectedMedicalCodes: [],
    },
    actions: {
        setMedicalCodes({ commit }, { medicalCodes }: { medicalCodes: number[] }) {
            commit("setMedicalCodes", { medicalCodes });
        },
    },
    mutations: {
        setMedicalCodes(state, { medicalCodes }: { medicalCodes: number[] }) {
            state.selectedMedicalCodes = medicalCodes;
        },
    },
    modules: {
        alert,
        user,
        settings,
    },
    getters: {
        appVersion: state => state.packageVersion,
    },
});
