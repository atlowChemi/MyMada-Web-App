import { Module } from "vuex";
import { IUserState, IRootState } from "../utils/types";

export const state: IUserState = {
    fcmToken: "",
    name: "",
    messageSeenByAdmin: undefined
};

export const user: Module<IUserState, IRootState> = {
    namespaced: true,
    state,
    actions: {
        changeName({ commit }, { name }: { name: string }) {
            commit("changeName", { name });
        }
    },
    mutations: {
        changeName(state, { name }: { name: string }) {
            state.name = name;
        }
    },
    getters: {
        validUserName: state => state.name.length > 0
    }
};
