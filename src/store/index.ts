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
        isMetronomeActive: false,
        metronomeActiveTime: "00:00",
        metronomeRound: 0,
    },
    actions: {
        setMedicalCodes({ commit }, { medicalCodes }: { medicalCodes: number[] }) {
            commit("setMedicalCodes", { medicalCodes });
        },
        addTeamMember({ commit }, { teamMember, index }: { teamMember: ITeamMember; index?: string }) {
            commit("addTeamMember", { teamMember, index });
        },
        removeTeamMember({ commit }, index: number) {
            commit("removeTeamMember", index);
        },
        setTeamMembers({ commit }, { teamMembers }: { teamMembers: ITeamMember[] }) {
            commit("setTeamMembers", { teamMembers });
        },
        setMetronome({ commit }, isActive: boolean) {
            commit("setMetronome", isActive);
        },
        setMetronomeTime({ commit }, activeTime: number) {
            commit("setMetronomeTime", activeTime);
        },
        setMetronomeRound({ commit }, roundNum: number) {
            commit("setMetronomeRound", roundNum);
        },
    },
    mutations: {
        setMedicalCodes(state, { medicalCodes }: { medicalCodes: number[] }) {
            state.selectedMedicalCodes = medicalCodes;
        },
        setTeamMembers(state, { teamMembers }: { teamMembers: ITeamMember[] }) {
            state.teamMembers = teamMembers;
        },
        addTeamMember(state, { teamMember, index }: { teamMember: ITeamMember; index?: number }) {
            if (index) {
                state.teamMembers[index].name = teamMember.name;
                state.teamMembers[index].role = teamMember.role;
            } else if (state.teamMembers.length < 4) {
                state.teamMembers.push(teamMember);
            }
        },
        removeTeamMember(state, index: number) {
            state.teamMembers.splice(index, 1);
        },
        setMetronome(state, isActive: boolean) {
            state.isMetronomeActive = isActive;
        },
        setMetronomeTime(state, activeTime: number) {
            function prettifyTimeString(num: number) {
                return (num < 10 ? "0" : "") + num;
            }
            activeTime = activeTime % 3600;
            let minutes = Math.floor(activeTime / 60);
            activeTime = activeTime % 60;
            let seconds = Math.floor(activeTime);
            state.metronomeActiveTime = `${prettifyTimeString(minutes)}:${prettifyTimeString(seconds)}`;
        },
        setMetronomeRound(state, roundNum: number) {
            state.metronomeRound = roundNum;
        },
    },
    modules: {
        alert,
        user,
        settings,
    },
    getters: {
        appVersion: state => state.packageVersion,
        teamMemberCount: state => state.teamMembers.length,
    },
});
