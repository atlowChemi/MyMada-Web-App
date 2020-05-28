import { Module } from "vuex";

export const state: AlertState = {
    show: false,
    type: "Success",
    message: "",
    title: "",
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
        clear({ commit }) {
            commit("clear");
        },
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
            state.title = title ?? "תקלה";
        },
        settings(state) {
            state.show = true;
            state.type = "Settings";
            state.message = "";
            state.title = "הגדרות";
        },
        changeName(state) {
            state.show = true;
            state.type = "ChangeName";
            state.message = "";
            state.title = "רשמו שם משתמש";
        },
        sendToMoked(state, { message }: { message: string }) {
            state.show = true;
            state.type = "SendToMoked";
            state.message = message;
            state.title = "אשר לפני שליחה";
        },
        medicalCodes(state, medicalCodes: number[]) {
            state.show = true;
            state.type = "MedicalCodePicker";
            state.message = medicalCodes.join(",");
            state.title = "אנא בחר קוד רפואי";
        },
        addTeamMember(state, teamMemberIndex?: number) {
            state.show = true;
            state.type = "AddTeamMember";
            state.message = teamMemberIndex!?.toString();
            state.title = "הוספת איש צוות";
        },
        requestUserUpdate(state) {
            state.show = true;
            state.type = "UpdateNeeded";
            state.message = "ישנו עדכון חדש המוסיף שיפורים ואפשרויות נוספות לשירות.\nהעדכון יכנס לתוקף מיד לאחר רענון העמוד.";
            state.title = "קיים עדכון גרסה";
        },
        clear(state) {
            state.show = false;
        },
    },
};
