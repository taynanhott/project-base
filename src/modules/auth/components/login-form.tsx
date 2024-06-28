"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import LoginGoogleForm from "./login-google";
import { AlertPopUp } from "@/components/ui/alert";

interface LoginFormProps {
  login: (formData: FormData) => Promise<boolean | void>;
  loginGoogle: (
    uid: string,
    name: string,
    email: string
  ) => Promise<boolean | void>;
}

export default function LoginForm({ login, loginGoogle }: LoginFormProps) {
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

  async function signIn(formData: FormData) {
    try {
      await login(formData).then((response) => {
        if (response == undefined) {
          setShowAlert(false);
        } else {
          alertHide();
        }
      });
    } catch (error) {
      console.error("failed sigin with email and password:", error);
      alertHide();
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Name</CardTitle>
        <CardDescription>Log in to continue.</CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn(new FormData(e.currentTarget));
        }}
      >
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-2/3 button">
            Sign In
          </Button>
          <Link
            href="/portal/sign-up"
            className={buttonVariants({ variant: "link" })}
          >
            Create Account
          </Link>
        </CardFooter>
      </form>
      {showAlert && <AlertPopUp />}
      <LoginGoogleForm loginGoogle={loginGoogle} />
    </Card>
  );
}
