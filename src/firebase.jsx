import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXD3kUK1AWCmsDE0QfpNzIP57X34hw24E",
  authDomain: "snapchat-clone-e5c61.firebaseapp.com",
  projectId: "snapchat-clone-e5c61",
  storageBucket: "snapchat-clone-e5c61.appspot.com",
  messagingSenderId: "1016306329619",
  appId: "1:1016306329619:web:a9c2fe8d73b7e751f537e6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const storage = getStorage(firebaseApp);

export const auth = firebase.auth();
export const provider =
  new firebase.auth.GoogleAuthProvider().setCustomParameters({
    prompt: "select_account",
  });

export default db;
