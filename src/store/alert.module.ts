import { Module } from "vuex";
import { AlertType } from "../utils/types";

export const state: IAlertState = {
    show: false,
    type: AlertType.Success,
    message: "",
    title: "",
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
        medicalCodes({ commit }, { selectedCodes }: { selectedCodes: number[] }) {
            commit("medicalCodes", selectedCodes);
        },
        addTeamMember({ commit }, teamMemberIndex?: number) {
            commit("addTeamMember", teamMemberIndex);
        },
        clear({ commit }) {
            commit("clear");
        },
    },
    mutations: {
        message(state, { message, title }: { message: string; title: string }) {
            state.show = true;
            state.type = AlertType.Success;
            state.message = message;
            state.title = title;
        },
        error(state, { message, title }: { message: string; title: string }) {
            state.show = true;
            state.type = AlertType.Error;
            state.message = message;
            state.title = title ?? "תקלה";
        },
        changeName(state) {
            state.show = true;
            state.type = AlertType.ChangeName;
            state.message = "";
            state.title = "רשמו שם משתמש";
        },
        settings(state) {
            state.show = true;
            state.type = AlertType.Settings;
            state.message = "";
            state.title = "הגדרות";
        },
        sendToMoked(state, { message }: { message: string }) {
            state.show = true;
            state.type = AlertType.SendToMoked;
            state.message = message;
            state.title = "אשר לפני שליחה";
        },
        medicalCodes(state, medicalCodes: number[]) {
            state.show = true;
            state.type = AlertType.MedicalCodePicker;
            state.message = medicalCodes.join(",");
            state.title = "אנא בחר קוד רפואי";
        },
        addTeamMember(state, teamMemberIndex?: number) {
            state.show = true;
            state.type = AlertType.AddTeamMember;
            state.message = teamMemberIndex!?.toString();
            state.title = "הוספת איש צוות";
        },
        clear(state) {
            state.show = false;
        },
    },
};
