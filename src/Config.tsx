import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyZZAkjRNeHmtP76D1rCLele_vXItMsxM",
  authDomain: "musicplayer-11b1b.firebaseapp.com",
  projectId: "musicplayer-11b1b",
  storageBucket: "musicplayer-11b1b.appspot.com",
  messagingSenderId: "399251134967",
  appId: "1:399251134967:web:91b52a167708bb389676f2",
  measurementId: "G-4GZ51TJVH2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const songcol = collection(db, "Songs");
export const usercol = collection(db, "Users");
export const storage = getStorage(app);
