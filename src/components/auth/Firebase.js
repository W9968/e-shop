import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAoaqeLu3iFfiESoHQJP8iQImZMe-ycWII",
  authDomain: "hanouti-60cf8.firebaseapp.com",
  projectId: "hanouti-60cf8",
  storageBucket: "hanouti-60cf8.appspot.com",
  messagingSenderId: "722059434820",
  appId: "1:722059434820:web:f0cb7ae364f67ca2f51511",
});

export const auth = app.auth();
export const useFireStore = firebase.firestore();
export const useFireStorage = firebase.storage();
export default app;
