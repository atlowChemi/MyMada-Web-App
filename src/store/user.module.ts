import { Module } from "vuex";
import { IUserState, IRootState } from "../utils/types";
import { DatabaseManager } from "./indexedDb";

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
        changeName({ commit }, { name }: { name: string }) {
            DatabaseManager.SetName(name)
                .then(() => commit("changeName", { name }))
                .catch(err => commit("alert/error", { message: err }));
        },
    },
    mutations: {
        changeName(state, { name }: { name: string }) {
            state.name = name;
        },
    },
    getters: {
        validUserName: state => state.name.length > 0,
    },
};
