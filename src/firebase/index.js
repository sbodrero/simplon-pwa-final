// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9eitE9YEN8anuGb3JVfxBpdjajhrE9pw",
  authDomain: "react-pwa-firebase-1.firebaseapp.com",
  projectId: "react-pwa-firebase-1",
  storageBucket: "react-pwa-firebase-1.appspot.com",
  messagingSenderId: "494157849416",
  appId: "1:494157849416:web:d9997a0f94cd243c0fc97d",
  measurementId: "G-XJKY20SK13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  analytics,
  db,
  storage,
}
