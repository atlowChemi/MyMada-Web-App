import Vue from "vue";
import Vuex from "vuex";

import { alert } from "./alert.module";
import { user } from "./user.module";
import { settings } from "./settings.module";
import { DatabaseManager } from "./indexedDb";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
    state: {
        packageVersion: process.env.PACKAGE_VERSION || "0",
        selectedMedicalCodes: [],
        teamMembers: [],
        isMetronomeActive: false,
        metronomeActiveTime: "00:00",
        metronomeRound: 0,
        contractions: [],
        retrieveContractions: false,
    },
    actions: {
        setMedicalCodes({ commit }, { medicalCodes }: { medicalCodes: number[] }) {
            commit("setMedicalCodes", { medicalCodes });
        },
        addTeamMember({ commit }, { teamMember, index }: { teamMember: TeamMember; index?: string }) {
            commit("addTeamMember", { teamMember, index });
        },
        removeTeamMember({ commit }, index: number) {
            commit("removeTeamMember", index);
        },
        setTeamMembers({ commit }, { teamMembers }: { teamMembers: TeamMember[] }) {
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
        setContractions({ commit }, contractions: Contraction[]) {
            DatabaseManager.SetContractions(contractions).then(() => commit("setContractions", contractions));
        },
        setRetrieveContractions({ commit, dispatch }, ret: boolean) {
            if (!ret) dispatch("setContractions", []);
            commit("setRetrieveContractions", ret);
        },
    },
    mutations: {
        setMedicalCodes(state, { medicalCodes }: { medicalCodes: number[] }) {
            state.selectedMedicalCodes = medicalCodes;
        },
        setTeamMembers(state, { teamMembers }: { teamMembers: TeamMember[] }) {
            state.teamMembers = teamMembers;
        },
        addTeamMember(state, { teamMember, index }: { teamMember: TeamMember; index?: number }) {
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
        setContractions(state, contractions: Contraction[]) {
            state.contractions = contractions;
        },
        setRetrieveContractions(state, ret: boolean) {
            state.retrieveContractions = ret;
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
