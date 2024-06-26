"use client";

import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";
import AuthActions from "../actions/auth-actions";

export default function LoginGoogleForm() {
    
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        AuthActions.loginGoogle(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <button type="button" onClick={signInWithGoogle} className="button">
      SignIn with Google
    </button>
  );
}
