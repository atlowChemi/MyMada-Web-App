export enum AlertType {
    Error,
    Success,
    Settings
}
export enum ModalFooterType {
    CloseOnly,
    SendToMoked,
    AddTeamMember
}
export interface IAlertState {
    show: boolean;
    type: AlertType;
    message: string;
    title: string;
    footerType: ModalFooterType;
}