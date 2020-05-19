import { Module } from "vuex";
import { AlertType, IAlertState, ModalFooterType } from "../utils/types";

export const state: IAlertState = {
    show: false,
    type: AlertType.Success,
    message: "",
    title: "",
    footerType: ModalFooterType.CloseOnly
};

export const alert: Module<IAlertState, null> = {
    namespaced: true,
    state,
    actions: {
        success(
            { commit },
            { message, title }: { message: string; title: string }
        ) {
            commit("success", { message, title });
        },
        error({ commit }, { message, title }: { message: string; title: string }) {
            commit("error", { message, title });
        },
        settings({ commit }) {
            commit("settings");
        },
        clear({ commit }) {
            commit("clear");
        }
    },
    mutations: {
        success(state, { message, title, footerType }: { message: string; title: string, footerType: ModalFooterType }) {
            state.show = true;
            state.type = AlertType.Success;
            state.message = message;
            state.title = title;
            state.footerType = footerType;
        },
        error(state, { message, title }: { message: string; title: string }) {
            state.show = true;
            state.type = AlertType.Error;
            state.message = message;
            state.title = title;
            state.footerType = ModalFooterType.CloseOnly;
        },
        settings(state) {
            state.show = true;
            state.type = AlertType.Settings;
            state.message = "";
            state.title = "הגדרות";
            state.footerType = ModalFooterType.CloseOnly;
        },
        clear(state) {
            state.show = false;
        }
    }
};
