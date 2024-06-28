"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config";
import { useState } from "react";
import { AlertPopUp } from "@/components/ui/alert";

interface LoginGoogleFormProps {
  loginGoogle: (
    uid: string,
    name: string,
    email: string
  ) => Promise<boolean | void>;
}

export default function LoginGoogleForm({ loginGoogle }: LoginGoogleFormProps) {
  const [showAlert, setShowAlert] = useState(false);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      if (result) {
        await loginGoogle(
          result.user.uid as string,
          result.user.displayName as string,
          result.user.email as string
        ).then((response) => {
          if (response) {
            setShowAlert(true);
          } else {
            setShowAlert(false);
          }
        });
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("failed sigin with Google account:", error);
      setShowAlert(true);
    }
  }

  return (
    <div className="flex justify-center w-full pb-4">
      <Button type="button" onClick={signInWithGoogle} className="button">
        Sign In with Google
      </Button>
      {showAlert && <AlertPopUp />}
    </div>
  );
}
