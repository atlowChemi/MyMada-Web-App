importScripts('https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.4/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBexDweJCEqx-6nQWPdAHxztngxVKsMCeg",
    authDomain: "project-3918384647339420127.firebaseapp.com",
    databaseURL: "https://project-3918384647339420127.firebaseio.com",
    projectId: "project-3918384647339420127",
    storageBucket: "project-3918384647339420127.appspot.com",
    messagingSenderId: "973214169451",
    appId: "1:973214169451:web:e5444b6a596b82fe56b42e",
    measurementId: "G-T6KM65ZGLN",
    locationId: "us-central",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
   // Customize notification here
   const notificationTitle = "הודעת צ'אט חדשה מאת מנהל!";
   const notificationOptions = {
      body: payload.data.msg,
      icon: 'img/icons/android-chrome-512x512.png'
   };
   return self.registration.showNotification(notificationTitle, notificationOptions);
});