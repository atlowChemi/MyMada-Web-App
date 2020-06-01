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
    export interface BeforeInstallPromptEvent extends Event {
        /**
         * Returns an array of DOMString items containing the platforms on which the
         * event was dispatched. This is provided for user agents that want to present
         * a choice of versions to the user such as, for example, "web" or "play"
         * which would allow the user to chose between a web version or an Android
         * version.
         */
        readonly platforms: Array<string>;

        /**
         * Returns a Promise that resolves to a DOMString containing either "accepted"
         * or "dismissed".
         */
        readonly userChoice: Promise<{
            outcome: "accepted" | "dismissed";
            platform: string;
        }>;

        /**
         * Allows a developer to show the install prompt at a time of their own
         * choosing. This method returns a Promise.
         */
        prompt(): Promise<void>;
    }
    export interface InputChangeEvent extends Event {
        readonly target: EventTarget & {
            value: string;
        };
    }
    export type AlertType = "Error" | "Success" | "Settings" | "ChangeName" | "SendToMoked" | "MedicalCodePicker" | "AddTeamMember" | "UpdateNeeded" | "ContractionRetrieve";
    export type Contraction = {
        /**
         * Timestamp of when contraction has begun.
         */
        startTime: number;
        /**
         * Timestamp of when contraction has ended.
         */
        endTime: number;
        /**
         * Time when previous contraction has ended
         */
        previousEnd: number | null;
    };
    export type RootState = {
        packageVersion: string;
        selectedMedicalCodes: number[];
        teamMembers: TeamMember[];
        isMetronomeActive: boolean;
        metronomeActiveTime: string;
        metronomeRound: number;
        contractions: Contraction[];
        retrieveContractions: boolean;
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
    export type DictionaryItem = {
        key: string;
        name: string;
        definition: string;
    };
    export type TeamMember = {
        name: string;
        role: MedicalRole;
    };
}
