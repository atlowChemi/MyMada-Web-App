import { Module } from "vuex";
import { Moked, Languages } from "../utils/types";
import { DatabaseManager } from "./indexedDb";

export const state: SettingsState = {
    moked: Moked.Jerusalem,
    lang: Languages.he,
    tools: ["contractions", "pulse", "metronome", "vital", "oxygen", "apgar", "glazgo", "dictionary", "protocoles"],
};

export const settings: Module<SettingsState, RootState> = {
    namespaced: true,
    state,
    actions: {
        initialize({ commit }) {
            DatabaseManager.GetSettings().then(sett => commit("setState", sett));
        },
        changeTools({ commit }, tools: string[]) {
            DatabaseManager.SetTools(tools)
                .then(() => commit("setTools", tools))
                .catch(err => commit("alert/error", { message: err }));
        },
        changeMoked({ commit }, moked: Moked) {
            DatabaseManager.SetMoked(moked)
                .then(() => commit("setMoked", moked))
                .catch(err => commit("alert/error", { message: err }));
        },
        changeLang({ commit }, lang: Languages) {
            DatabaseManager.SetLang(lang)
                .then(() => commit("setLang", lang))
                .catch(err => commit("alert/error", { message: err }));
        },
    },
    mutations: {
        setState(state, sett: SettingsState) {
            state.lang = sett.lang;
            state.moked = sett.moked;
            state.tools = sett.tools;
        },
        setTools(state, tools: string[]) {
            state.tools = tools;
        },
        setMoked(state, moked: Moked) {
            state.moked = moked;
        },
        setLang(state, lang: Languages) {
            state.lang = lang;
        },
    },
};
