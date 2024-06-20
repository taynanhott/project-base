"use client";

import { auth } from "./firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function HomePage() {
  const router = useRouter();
  return (
    <div>
      <h1>Login realizado</h1>
      <button
        className="cursor-pointer"
        onClick={() => {
          signOut(auth);
          sessionStorage.removeItem("user");
          router.push("/sign-in");
        }}
      >
        Log Out
      </button>
    </div>
  );
}
