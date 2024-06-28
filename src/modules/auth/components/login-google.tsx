"use client";

import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config";
import AuthActions from "../actions/auth-actions";

export default function LoginGoogleForm({ loginGoogle }: { loginGoogle: (user: User) => Promise<void> }) {
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
      console.log(result.user);
      loginGoogle(result.user);
    });
  }

  return (
    <div className="flex justify-center w-full pb-4">
      <Button type="button" onClick={signInWithGoogle} className="button">
        Sign In with Google
      </Button>
    </div>
  );
}
