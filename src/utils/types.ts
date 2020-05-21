export enum AlertType {
    Error,
    Success,
    Settings,
    ChangeName,
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
export interface IRootState {
    packageVersion: string;
}
export interface IAlertState {
    show: boolean;
    type: AlertType;
    message: string;
    title: string;
    footerType: ModalFooterType;
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
