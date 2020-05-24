import { Module } from "vuex";
import { AlertType, IAlertState, ModalFooterType, IRootState } from "../utils/types";

export const state: IAlertState = {
    show: false,
    type: AlertType.Success,
    message: "",
    title: "",
    footerType: ModalFooterType.CloseOnly,
};

export const alert: Module<IAlertState, IRootState> = {
    namespaced: true,
    state,
    actions: {
        message({ commit }, { message, title }: { message: string; title: string }) {
            commit("success", { message, title });
        },
        error({ commit }, { message, title }: { message: string; title?: string }) {
            commit("error", { message, title });
        },
        settings({ commit }) {
            commit("settings");
        },
        changeName({ commit }) {
            commit("changeName");
        },
        sendToMoked({ commit }, { message }: { message: string }) {
            commit("sendToMoked", { message });
        },
        clear({ commit }) {
            commit("clear");
        },
    },
    mutations: {
        message(state, { message, title, footerType }: { message: string; title: string; footerType: ModalFooterType }) {
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
            state.title = title ?? "תקלה";
            state.footerType = ModalFooterType.CloseOnly;
        },
        changeName(state) {
            state.show = true;
            state.type = AlertType.ChangeName;
            state.message = "";
            state.title = "רשמו שם משתמש";
            state.footerType = ModalFooterType.CloseOnly;
        },
        settings(state) {
            state.show = true;
            state.type = AlertType.Settings;
            state.message = "";
            state.title = "הגדרות";
            state.footerType = ModalFooterType.CloseOnly;
        },
        sendToMoked(state, { message }: { message: string }) {
            state.show = true;
            state.type = AlertType.SendToMoked;
            state.message = message;
            state.title = "אשר לפני שליחה";
            state.footerType = ModalFooterType.SendToMoked;
        },
        clear(state) {
            state.show = false;
        },
    },
};
