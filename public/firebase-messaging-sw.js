// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDcV6xhVV1D6jv6yjQ4Tnc8q5BS4xPVIvQ",
  authDomain: "jfejcxjyujx.firebaseapp.com",
  databaseURL:
    "https://jfejcxjyujx-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jfejcxjyujx",
  storageBucket: "jfejcxjyujx.appspot.com",
  messagingSenderId: "815656493029",
  appId: "1:815656493029:web:593d18324b0ab30cb5d90c",
  measurementId: "G-LB96JH1BJY",
};
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log(
  //   "[firebase-messaging-sw.js] Received background message ",
  //   payload
  // );
  // Customize notification here
  const notificationTitle = "Background Message --title";
  const notificationOptions = {
    body: "Background Message --body",
    // icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
