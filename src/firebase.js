import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


  const firebaseConfig = {
    apiKey: "AIzaSyCzWo8R17QWIhIF_j0326pPN314N9TjeyQ",
    authDomain: "store-71443.firebaseapp.com",
    projectId: "store-71443",
    storageBucket: "store-71443.appspot.com",
    messagingSenderId: "1031813670767",
    appId: "1:1031813670767:web:3ae3d34411a33dc0b5ea9a"
  };

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth();
 export const storage = getStorage();
 export const db= getFirestore();
