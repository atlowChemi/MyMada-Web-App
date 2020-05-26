export enum AlertType {
    Error,
    Success,
    Settings,
    ChangeName,
    SendToMoked,
    MedicalCodePicker,
    AddTeamMember,
}

export enum ModalFooterType {
    CloseOnly,
    SendToMoked,
    AddTeamMember,
}

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

// export interface IRootState {
//     packageVersion: string;
//     selectedMedicalCodes: number[];
//     teamMembers: ITeamMember[];
// }

// export interface IAlertState {
//     show: boolean;
//     type: AlertType;
//     message: string;
//     title: string;
// }

// export interface IUserState {
//     name: string;
//     fcmToken: string;
//     messageSeenByAdmin: boolean | undefined;
// }

// export interface ISettingsState {
//     moked: Moked;
//     lang: Languages;
//     tools: string[];
// }

// export interface IMedicalCode {
//     name: string;
//     code?: number;
//     group: MedicalCodeGroup;
// }

// export interface ITeamMember {
//     name: string;
//     role: MedicalRole;
// }
