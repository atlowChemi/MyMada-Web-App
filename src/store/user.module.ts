import { Module } from "vuex";
import { DatabaseManager } from "./indexedDb";
import { ContactDb } from "@/utils/firebaseConfig";

export const state: IUserState = {
    fcmToken: "",
    name: "",
    messageSeenByAdmin: undefined,
};

export const user: Module<IUserState, IRootState> = {
    namespaced: true,
    state,
    actions: {
        initialize({ commit }) {
            DatabaseManager.GetName().then(name => commit("changeName", { name }));
        },
        initializeFcm({ commit }, token: string) {
            DatabaseManager.SetFcmToken(token).then(() => commit("changeFcm", { token }));
        },
        changeName({ commit, state }, { name }: { name: string }) {
            ContactDb(state.fcmToken)
                .update({ Name: name })
                .then(() => console.log("Saved!", state.fcmToken));
            DatabaseManager.SetName(name)
                .then(() => commit("changeName", { name }))
                .catch(err => commit("alert/error", { message: err }));
        },
    },
    mutations: {
        changeName(state, { name }: { name: string }) {
            state.name = name;
        },
        changeFcm(state, { token }: { token: string }) {
            state.fcmToken = token;
        },
    },
    getters: {
        validUserName: state => state.name?.length > 0,
    },
};
