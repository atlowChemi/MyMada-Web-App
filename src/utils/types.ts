export enum AlertType {
    Error,
    Success,
    Settings,
    ChangeName
}
export enum ModalFooterType {
    CloseOnly,
    SendToMoked,
    AddTeamMember
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
    moked: number,
    lang: string,
    tools: string[]
}