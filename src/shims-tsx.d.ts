import Vue, { VNode } from "vue";
import { AlertType, Moked, Languages, MedicalCodeGroup, MedicalRole } from "@/utils/types";

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
    export interface IRootState {
        packageVersion: string;
        selectedMedicalCodes: number[];
        teamMembers: ITeamMember[];
        isMetronomeActive: boolean;
        metronomeActiveTime: string;
        metronomeRound: number;
    }
    export interface IAlertState {
        show: boolean;
        type: AlertType;
        message: string;
        title: string;
    }
    export interface IUserState {
        name: string;
        fcmToken: string;
        messageSeenByAdmin: boolean | undefined;
    }
    export interface ISettingsState {
        moked: Moked;
        lang: Languages;
        tools: string[];
    }
    export interface IMedicalCode {
        name: string;
        code?: number;
        group: MedicalCodeGroup;
    }
    export interface ITeamMember {
        name: string;
        role: MedicalRole;
        time?: Date;
    }
}
