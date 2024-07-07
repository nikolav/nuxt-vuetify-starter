// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const config = {
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
// Initialize Firebase
export const app = 0 < getApps().length ? getApp() : initializeApp(config);

// Initialize Cloud Firestore and get a reference to the service
export const auth = getAuth(app);
// export const db = getFirestore(app);
export const storage = getStorage(app);

// Web Push certificates
// Firebase Cloud Messaging can use Application Identity key pairs to connect with external push services.
// #https://developers.google.com/web/updates/2016/07/web-push-interop-wins#introducing_vapid_for_server_identification
export const VAPID_KEY = "BA5afVljVVDNRB2hf-lwSFwzAZcgVW1mYFsT65Oszp9qZIWOfZ9HTX_OXZfErx7iMXXZXv37CW8kS2H4xBJ-naE"
