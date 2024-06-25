import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkRGuSy2FmlUDkRnUJEQA5BdUIT9_Xfus",
  authDomain: "auth-project-94f3a.firebaseapp.com",
  projectId: "auth-project-94f3a",
  storageBucket: "auth-project-94f3a.appspot.com",
  messagingSenderId: "562002336188",
  appId: "1:562002336188:web:59b39d60a6d48d4820b3b9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
