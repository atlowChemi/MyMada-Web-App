/**
 * Available languages in the App.
 */
export enum Languages {
    /**
     * עברית
     */
    he,
    /**
     * English
     */
    en,
}

/**
 * Available Mokdim for forms dictation.
 */
export enum Moked {
    /**
     * ירושלים
     */
    Jerusalem,
    /**
     * איילון
     */
    Ayalon,
    /**
     * אשר
     */
    Asher,
    /**
     * גלבוע
     */
    Gilboa,
    /**
     * דן
     */
    Dan,
    /**
     * ירדן
     */
    Yarden,
    /**
     * ירקון
     */
    Yarkon,
    /**
     * כרמל
     */
    Carmel,
    /**
     * לכיש
     */
    Lachish,
    /**
     * נגב
     */
    Negev,
    /**
     * שרון
     */
    Sharon,
    /**
     * מוקד 4 של קריית 4
     */
    Moked4,
}

/**
 * The available groups of medical codes.
 */
export enum MedicalCodeGroup {
    /**
     * מצבי חירום סביבתיים
     */
    Area,
    /**
     * טראומה
     */
    Trauma,
    /**
     * כאבים
     */
    Pain,
    /**
     * מערכת הלב וכלי הדם
     */
    Cardio,
    /**
     * מערכת הנשימה
     */
    Pulmonary,
    /**
     * נוירולוגיה
     */
    Neurology,
    /**
     * מערכת העיכול
     */
    Digestion,
    /**
     * זיהומי
     */
    Septic,
    /**
     * פסיכיאטריה
     */
    Psychiatry,
    /**
     * אנדוקרינולוגיה
     */
    Endocrinology,
    /**
     * מערכת המין והשתן
     */
    Genital,
    /**
     * כללי
     */
    General,
}

/**
 * The medical role of a MADA team member.
 */
export enum MedicalRole {
    /**
     * The driver of the ambulance.
     */
    Driver,
    /**
     * A regular EMT in the ambulance.
     */
    EMT,
    /**
     * A MADA paramedic.
     */
    Paramedic,
    /**
     * A MADA doctor.
     */
    Doctor,
    /**
     * A Volunteer younger than 18.
     */
    Volunteer,
    /**
     * An EMT who's still during his course.
     */
    Student,
    /**
     * A person in civil service.
     */
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
    /**
     * The different available types of modal.
     */
    export type AlertType = "Error" | "Success" | "Settings" | "ChangeName" | "SendToMoked" | "MedicalCodePicker" | "AddTeamMember" | "UpdateNeeded" | "ContractionRetrieve" | "DictionaryAdd";
    /**
     * The root state of MyMada-web app's store.
     */
    export type RootState = {
        /**
         * Version number of web app.
         */
        packageVersion: string;
        /**
         * The medical codes that were selected in modal, and should be present in forms page.
         */
        selectedMedicalCodes: number[];
        /**
         * The team members added in forms page.
         */
        teamMembers: TeamMember[];
        /**
         * Is the metronome currently active.
         */
        isMetronomeActive: boolean;
        /**
         * Time since metronome has started.
         */
        metronomeActiveTime: string;
        /**
         * Number of CPR round since metronome has begun.
         */
        metronomeRound: number;
        /**
         * Contractions that have been messured.
         */
        contractions: Contraction[];
        /**
         * Has user asked to retrieve contractions.
         */
        retrieveContractions: boolean;
    };
    /**
     * The Alert's state of MyMada-web app's store.
     */
    export type AlertState = {
        /**
         * Is modal currently shown.
         */
        show: boolean;
        /**
         * What type is the shown modal.
         */
        type: AlertType;
        /**
         * The message of given modal.
         */
        message: string;
        /**
         * The title of given modal.
         */
        title: string;
        /**
         * Is snackbar currently shown.
         */
        showSnackbar: boolean;
        /**
         * Message to show in snackbar.
         */
        snackbarMessage: string;
    };
    /**
     * The User state of MyMada-web app's store.
     */
    export type UserState = {
        /**
         * Name of current user (for contact).
         */
        name: string;
        /**
         * The FCM token of current client.
         */
        fcmToken: string;
        /**
         * Has the latest message been seen by admin or not.
         */
        messageSeenByAdmin: boolean | undefined;
    };
    /**
     * The Settings state of MyMada-web app's store.
     */
    export type SettingsState = {
        /**
         * The moked selected to send messages to.
         */
        moked: Moked;
        /**
         * The selected language for the app.
         */
        lang: Languages;
        /**
         * The selected tools.
         */
        tools: string[];
    };
    /**
     * A single contraction.
     */
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
    /**
     * A single medical code, or medical code categories title.
     */
    export type MedicalCode = {
        /**
         * The name of the code, or code category.
         */
        name: string;
        /**
         * The actual number of code (null for a category title).
         */
        code?: number;
        /**
         * The group of codes this code belongs to.
         */
        group: MedicalCodeGroup;
    };
    /**
     * A Item in medical dictionary.
     */
    export type DictionaryItem = {
        /**
         * The DB key of given item.
         */
        key: string;
        /**
         * The name of the item.
         */
        name: string;
        /**
         * The definition of the dictionary item.
         */
        definition: string;
    };
    /**
     * A representation of a team member.
     */
    export type TeamMember = {
        /**
         * Name of the team member.
         */
        name: string;
        /**
         * Role of the team member.
         */
        role: MedicalRole;
    };
    /**
     * The details of a drag event.
     */
    export type DragEventDetails = {
        /**
         * X amount of drag.
         */
        x: number;
    };
}
