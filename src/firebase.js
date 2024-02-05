import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBfoT8keTNNj9oIi4KYT5IQ00N5e5okF0w",
  authDomain: "data-app-a3ca2.firebaseapp.com",
  projectId: "data-app-a3ca2",
  storageBucket: "data-app-a3ca2.appspot.com",
  messagingSenderId: "506525371561",
  appId: "1:506525371561:web:66506ff60ad5a6fb082db8",
  measurementId: "G-S9FG19DNL8"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth();
 export const storage = getStorage();
 export const db= getFirestore();
