import { Languages, Moked } from "@/utils/types";

class _DatabaseManager {
    private dbName = "myMada";
    private db!: IDBDatabase;
    private errorCallback!: (msg: string) => void;

    InitDb() {
        return new Promise((resolve, reject) => {
            if (!indexedDB) {
                reject("הדפדפן שלך אינו תומך באפשרות של שמירת המידע. אי לכך, האתר לא יפעל כמצופה.");
                //We will work on LocalStorage later.
            } else {
                let openRequest = indexedDB.open(this.dbName, 1);
                openRequest.onupgradeneeded = this.AddTables;
                openRequest.onerror = () => this.errorCallback(openRequest.error?.message ?? "");
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
            let objStore = this.db.createObjectStore("Settings"); // create DB
            objStore.add(undefined, "name");
            objStore.add(undefined, "fcmToken");
            objStore.add(Moked.Jerusalem, "moked");
            objStore.add(Languages.he, "lang");
            objStore.add(["contractions", "pulse", "metronome", "vital", "oxygen", "apgar", "glazgo", "dictionary", "protocoles"], "tools");
        }
    }
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
}

export const DatabaseManager = new _DatabaseManager();
