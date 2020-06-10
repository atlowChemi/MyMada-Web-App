import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/messaging";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBexDweJCEqx-6nQWPdAHxztngxVKsMCeg",
    authDomain: "project-3918384647339420127.firebaseapp.com",
    databaseURL: "https://project-3918384647339420127.firebaseio.com",
    projectId: "project-3918384647339420127",
    storageBucket: "project-3918384647339420127.appspot.com",
    messagingSenderId: "973214169451",
    appId: "1:973214169451:web:e5444b6a596b82fe56b42e",
    measurementId: "G-T6KM65ZGLN",
};

firebase.initializeApp(firebaseConfig);

let messaging: firebase.messaging.Messaging | { usePublicVapidKey: (key: string) => void; requestPermission(): Promise<void>; getToken(): Promise<string> };
try {
    messaging = firebase.messaging();
} catch (err) {
    messaging = {
        usePublicVapidKey() {},
        requestPermission() {
            return new Promise<void>(() => {});
        },
        getToken() {
            return new Promise<string>(() => {});
        },
    };
}

const defaultAnalytics = firebase.analytics();
defaultAnalytics.logEvent("Web App Open", { name: "website Opened!" });
messaging.usePublicVapidKey("BEFLpvSn04jJC8mgoS4k7zBzDBN3GEq_GXPHpp1d4Q6VePrq3yyRFh0SeBtAEqf156xuJ811CGC8ipfGdcMIj4Y");

const DB = firebase.database();
const FB = firebase.firestore();

FB.enablePersistence({ synchronizeTabs: true }).catch(err => {
    console.log(err);
});

const setup = () => {
    return new Promise<string>((resolve, reject) => {
        messaging
            .requestPermission()
            .then(() => messaging.getToken())
            .then(token => {
                resolve(token);
            })
            .catch(err => {
                resolve("ERR");
                reject(err);
            });
    });
};

const AddToDictionary = (item: DictionaryItem) =>
    new Promise<void>((resolve, reject) => {
        let newWord = FB.collection("dictionary").doc();
        newWord
            .set({ approved: false, ...item, key: newWord.id })
            .then(resolve)
            .catch(reject);
    });

const ContactDb = (fcmToken: string) => DB.ref(`chats/${fcmToken}`);

export { setup, ContactDb, DB, FB, AddToDictionary };
