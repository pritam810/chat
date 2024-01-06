import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB8-MEqeaG1RhWeK9ICUj4Vmhl1yxi-uk8",
  authDomain: "chat-70ec1.firebaseapp.com",
  projectId: "chat-70ec1",
  storageBucket: "chat-70ec1.appspot.com",
  messagingSenderId: "826023173679",
  appId: "1:826023173679:web:f77f92d0e9cd80de8cf0da"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth();
 export const storage = getStorage();
 export const db= getFirestore();