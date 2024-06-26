"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config";

export default function LoginGoogleForm() {
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
      console.log(result.user);
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
