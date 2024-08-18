// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import {
//   getMessaging,
//   isSupported as messagingIsSupported,
// } from "firebase/messaging";

import {
  getRemoteConfig,
  isSupported as remoteConfigIsSupported,
} from "firebase/remote-config";

import { PRODUCTION$ } from "../../config/vars.env";

// Firebase configuration
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
export const db = getFirestore(app);
export const storage = getStorage(app);

// export const messaging = async () =>
//   (await messagingIsSupported()) ? getMessaging(app) : undefined;

export const remoteConfig = async () => {
  if (!(await remoteConfigIsSupported())) return;
  const serviceRC = getRemoteConfig(app);
  // minimum fetch interval:
  //   0     development
  //   1hour production
  serviceRC.settings.minimumFetchIntervalMillis = PRODUCTION$ ? 3600000 : 0;
  return serviceRC;
};
