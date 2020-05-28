// export enum AlertType {
//     Error,
//     Success,
//     Settings,
//     ChangeName,
//     SendToMoked,
//     MedicalCodePicker,
//     AddTeamMember,
//     UpdateNeeded,
// }

export enum Languages {
    he,
    en,
}

export enum Moked {
    Jerusalem,
    Ayalon,
    Asher,
    Gilboa,
    Dan,
    Yarden,
    Yarkon,
    Carmel,
    Lachish,
    Negev,
    Sharon,
    Moked4,
}

export enum MedicalCodeGroup {
    Area,
    Trauma,
    Pain,
    Cardio,
    Pulmonary,
    Neurology,
    Digestion,
    Septic,
    Psychiatry,
    Endocrinology,
    Genital,
    General,
}

export enum MedicalRole {
    Driver,
    EMT,
    Paramedic,
    Doctor,
    Volunteer,
    Student,
    Service,
}

declare global {
    export type AlertType = "Error" | "Success" | "Settings" | "ChangeName" | "SendToMoked" | "MedicalCodePicker" | "AddTeamMember" | "UpdateNeeded";
    export type RootState = {
        packageVersion: string;
        selectedMedicalCodes: number[];
        teamMembers: TeamMember[];
        isMetronomeActive: boolean;
        metronomeActiveTime: string;
        metronomeRound: number;
    };
    export type AlertState = {
        show: boolean;
        type: AlertType;
        message: string;
        title: string;
    };
    export type UserState = {
        name: string;
        fcmToken: string;
        messageSeenByAdmin: boolean | undefined;
    };
    export type SettingsState = {
        moked: Moked;
        lang: Languages;
        tools: string[];
    };
    export type MedicalCode = {
        name: string;
        code?: number;
        group: MedicalCodeGroup;
    };
    export type TeamMember = {
        name: string;
        role: MedicalRole;
        time?: Date;
    };
}
