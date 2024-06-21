"use client";

import { Inter } from "next/font/google";
import "./globals.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user] = useAuthState(auth);
  const router = typeof window !== "undefined" ? useRouter() : null; // Ensure useRouter is only called on the client side
  const [userSession, setUserSession] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("user");
      setUserSession(session || "");
    }
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", user.uid);
      setUserSession(user.uid);
    } else {
      sessionStorage.removeItem("user");
      setUserSession("");
    }
  }, [user]);

  useEffect(() => {
    if (!user && !userSession && router) {
      router.push("/sign-in");
    }
  }, [user, userSession, router]);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
