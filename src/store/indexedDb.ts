import { Languages, Moked } from "@/utils/types";
import { getBrowserLocale } from "@/utils/helperMethods";

class _DatabaseManager {
    private dbName = "myMada";
    private db!: IDBDatabase;
    //#region Initialize the DB and close up
    InitDb() {
        return new Promise((resolve, reject) => {
            if (!indexedDB) {
                reject("הדפדפן שלך אינו תומך באפשרות של שמירת המידע. אי לכך, האתר לא יפעל כמצופה.");
                //We will work on LocalStorage later.
            } else {
                let openRequest = indexedDB.open(this.dbName, 2);
                openRequest.onupgradeneeded = this.AddTables;
                openRequest.onerror = () => reject(openRequest.error?.message ?? "");
                openRequest.onsuccess = () => {
                    this.db = openRequest.result;
                    resolve();
                    this.db.onversionchange = () => {
                        this.db.close();
                        reject("הנתונים שלך ישנים. עליך לרענן את העמוד בכדי שהדברים יפעלו.");
                    };
                };
                openRequest.onblocked = function() {
                    // there's another open connection to same database and it wasn't closed after db.onversionchange triggered for them\
                    reject("קיים חיבור נוסף פתוח לשרת!");
                };
            }
        });
    }
    private AddTables(e: any) {
        this.db = e.target.result;
        if (!this.db.objectStoreNames.contains("Settings")) {
            //First detect if browser is in english
            let lang: Languages = Languages.he;
            const browserLocale = getBrowserLocale();
            if (browserLocale == "en") lang = Languages.en;
            let objStore = this.db.createObjectStore("Settings"); // create DB
            objStore.add(undefined, "name");
            objStore.add(undefined, "fcmToken");
            objStore.add(Moked.Jerusalem, "moked");
            objStore.add(lang, "lang");
            objStore.add(["contractions", "pulse", "metronome", "vital", "oxygen", "apgar", "glazgo", "dictionary", "protocoles"], "tools");
            objStore.add(false, "AskedForInstallation");
        }
    }
    //#endregion
    //#region Set up FcmToken
    SetFcmToken(fcmToken: string): Promise<undefined> {
        return new Promise<undefined>((resolve, reject) => {
            let transaction = this.db.transaction(["Settings"], "readwrite");
            let objStore = transaction.objectStore("Settings");
            let nameSetRequest = objStore.put(fcmToken, "fcmToken");
            nameSetRequest.onerror = () => reject("אירעה שגיאה בשמירה!");
            nameSetRequest.onsuccess = () => resolve(undefined);
        });
    }
    //#endregion
    GetName(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let transaction = this.db.transaction(["Settings"], "readonly");
            let objStore = transaction.objectStore("Settings");
            let nameRequest = objStore.get("name");
            nameRequest.onerror = () => reject("שגיאה בקריאת נתונים!");
            nameRequest.onsuccess = () => resolve(nameRequest.result);
        });
    }
    SetName(name: string): Promise<undefined> {
        return new Promise<undefined>((resolve, reject) => {
            let transaction = this.db.transaction(["Settings"], "readwrite");
            let objStore = transaction.objectStore("Settings");
            let nameSetRequest = objStore.put(name, "name");
            nameSetRequest.onerror = () => reject("אירעה שגיאה בשמירה!");
            nameSetRequest.onsuccess = () => resolve(undefined);
        });
    }
    GetSettings(): Promise<SettingsState> {
        return new Promise<SettingsState>((resolve, reject) => {
            let transaction = this.db.transaction(["Settings"], "readonly");
            let objStore = transaction.objectStore("Settings");
            let keys = ["moked", "lang", "tools"];
            Promise.all(
                keys.map(
                    key =>
                        new Promise<any>((resolve, reject) => {
                            const request = objStore.get(key);
                            request.onsuccess = () => resolve(request.result);
                            request.onerror = () => reject(request.error);
                        })
                )
            )
                .then(values => keys.reduce((result: any, key: string, index) => ((result[key] = values[index]), result), {}))
                .then(res => {
                    resolve({
                        lang: res.lang ?? Languages.he,
                        moked: res.moked ?? Moked.Jerusalem,
                        tools: res.tools,
                    });
                })
                .catch(reject);
        });
    }
    SetTools(tools: string[]): Promise<undefined> {
        return new Promise<undefined>((resolve, reject) => {
            let transaction = this.db.transaction(["Settings"], "readwrite");
            let objStore = transaction.objectStore("Settings");
            let nameSetRequest = objStore.put(tools, "tools");
            nameSetRequest.onerror = () => reject("אירעה שגיאה בשמירה!");
            nameSetRequest.onsuccess = () => resolve(undefined);
        });
    }
    SetMoked(moked: Moked): Promise<undefined> {
        return new Promise<undefined>((resolve, reject) => {
            let transaction = this.db.transaction(["Settings"], "readwrite");
            let objStore = transaction.objectStore("Settings");
            let nameSetRequest = objStore.put(moked, "moked");
            nameSetRequest.onerror = () => reject("אירעה שגיאה בשמירה!");
            nameSetRequest.onsuccess = () => resolve(undefined);
        });
    }
    SetLang(lang: Languages): Promise<undefined> {
        return new Promise<undefined>((resolve, reject) => {
            let transaction = this.db.transaction(["Settings"], "readwrite");
            let objStore = transaction.objectStore("Settings");
            let nameSetRequest = objStore.put(lang, "lang");
            nameSetRequest.onerror = () => reject("אירעה שגיאה בשמירה!");
            nameSetRequest.onsuccess = () => resolve(undefined);
        });
    }
    GetAskedInstall(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            let transaction = this.db.transaction(["Settings"], "readonly");
            let objStore = transaction.objectStore("Settings");
            let res = objStore.get("AskedForInstallation");
            res.onerror = () => resolve(false);
            res.onsuccess = () => resolve(res.result);
        });
    }
    SetAskedInstall(val: boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let transaction = this.db.transaction(["Settings"], "readwrite");
            let objStore = transaction.objectStore("Settings");
            let nameSetRequest = objStore.put(val, "AskedForInstallation");
            nameSetRequest.onerror = () => reject("אירעה שגיאה בשמירה!");
            nameSetRequest.onsuccess = () => resolve();
        });
    }
    GetContractions(): Promise<Contraction[]> {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction(["Settings"], "readonly");
            let objStore = transaction.objectStore("Settings");
            let res = objStore.get("Contractions");
            res.onerror = () => reject("שגיאה בקריאת הנתונים!");
            res.onsuccess = () => resolve(res.result);
        });
    }
    SetContractions(val: Contraction[]): Promise<void> {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction(["Settings"], "readwrite");
            let objStore = transaction.objectStore("Settings");
            let contractionSetRequest = objStore.put(val, "Contractions");
            contractionSetRequest.onerror = () => reject("אירעה שגיאה בשמירה!");
            contractionSetRequest.onsuccess = () => resolve();
        });
    }
}

export const DatabaseManager = new _DatabaseManager();
