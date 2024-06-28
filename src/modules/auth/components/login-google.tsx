"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  function alertHide() {
    setShowAlert(true);

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => clearTimeout(timer);
  }

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
          if (response == undefined) {
            setShowAlert(false);
          } else {
            alertHide();
          }
        });
      } else {
        alertHide();
      }
    } catch (error) {
      console.error("failed sigin with Google account:", error);
      alertHide();
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
