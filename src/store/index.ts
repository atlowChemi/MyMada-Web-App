import Vue from "vue";
import Vuex from "vuex";

import { alert } from "./alert.module";
import { user } from "./user.module";
import { settings } from "./settings.module";

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
    state: {
        packageVersion: process.env.PACKAGE_VERSION || "0",
        selectedMedicalCodes: [],
        teamMembers: [],
    },
    actions: {
        setMedicalCodes({ commit }, { medicalCodes }: { medicalCodes: number[] }) {
            commit("setMedicalCodes", { medicalCodes });
        },
        addTeamMember({ commit }, teamMember: ITeamMember) {
            commit("addTeamMember", teamMember);
        },
        setTeamMembers({ commit }, { teamMembers }: { teamMembers: ITeamMember[] }) {
            commit("setMedicalCodes", { teamMembers });
        },
    },
    mutations: {
        setMedicalCodes(state, { medicalCodes }: { medicalCodes: number[] }) {
            state.selectedMedicalCodes = medicalCodes;
        },
        addTeamMember(state, teamMember: ITeamMember) {
            if (state.teamMembers.length <= 4) {
                state.teamMembers.push(teamMember);
            }
        },
        setTeamMembers(state, { teamMembers }: { teamMembers: ITeamMember[] }) {
            state.teamMembers = teamMembers;
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
