import { Module } from "vuex";

import i18n from "@/i18n";

export const state: AlertState = {
    show: false,
    type: "Success",
    message: "",
    title: "",
    showSnackbar: false,
    snackbarMessage: "",
};

export const alert: Module<AlertState, RootState> = {
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
        requestUserUpdate({ commit }) {
            commit("requestUserUpdate");
        },
        restoreContractions({ commit }) {
            commit("restoreContractions");
        },
        addToDictionary({ commit }) {
            commit("addToDictionary");
        },
        clear({ commit }) {
            commit("clear");
        },
        //#region Snackbar
        showSnackbar({ commit }, { show, msg }: { show: boolean; msg?: string }) {
            commit("showSnackbar", { show, msg });
        },
        //#endregion
    },
    mutations: {
        message(state, { message, title }: { message: string; title: string }) {
            state.show = true;
            state.type = "Success";
            state.message = message;
            state.title = title;
        },
        error(state, { message, title }: { message: string; title: string }) {
            state.show = true;
            state.type = "Error";
            state.message = message;
            state.title = title ?? i18n.t("common.error");
        },
        settings(state) {
            state.show = true;
            state.type = "Settings";
            state.message = "";
            state.title = "modals.settings.title";
        },
        changeName(state) {
            state.show = true;
            state.type = "ChangeName";
            state.message = "";
            state.title = i18n.t("modals.change-name.title").toString();
        },
        sendToMoked(state, { message }: { message: string }) {
            state.show = true;
            state.type = "SendToMoked";
            state.message = message;
            state.title = i18n.t("modals.send-moked.title").toString();
        },
        medicalCodes(state, medicalCodes: number[]) {
            state.show = true;
            state.type = "MedicalCodePicker";
            state.message = medicalCodes.join(",");
            state.title = i18n.t("modals.medical-codes.title").toString();
        },
        addTeamMember(state, teamMemberIndex?: number) {
            state.show = true;
            state.type = "AddTeamMember";
            state.message = teamMemberIndex!?.toString();
            state.title = i18n.t("modals.team-member.title").toString();
        },
        requestUserUpdate(state) {
            state.show = true;
            state.type = "UpdateNeeded";
            state.message = i18n.t("modals.refresh.message").toString();
            state.title = i18n.t("modals.refresh.title").toString();
        },
        restoreContractions(state) {
            state.show = true;
            state.type = "ContractionRetrieve";
            state.message = i18n.t("modals.retrieve.message").toString();
            state.title = i18n.t("modals.retrieve.title").toString();
        },
        addToDictionary(state) {
            state.show = true;
            state.type = "DictionaryAdd";
            state.message = "";
            state.title = i18n.t("modals.add-to-dictionary.title").toString();
        },
        clear(state) {
            state.show = false;
        },
        //#region Snackbar
        showSnackbar(state, { show, msg }: { show: boolean; msg?: string }) {
            state.showSnackbar = show;
            state.snackbarMessage = msg || "";
        },
        //#endregion
    },
};
