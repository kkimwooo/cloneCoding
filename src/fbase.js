import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCgGvWaAU_uc6u8Dqnnnq_e0O7g8TlGI4o",
  authDomain: "nwitter-99819.firebaseapp.com",
  databaseURL: "https://nwitter-99819.firebaseio.com",
  projectId: "nwitter-99819",
  storageBucket: "nwitter-99819.appspot.com",
  messagingSenderId: "350966569404",
  appId: "1:350966569404:web:a16c327b3052c9f9a7f3b9",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
