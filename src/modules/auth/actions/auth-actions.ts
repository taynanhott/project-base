import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import AuthService from "../services/auth-service";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";

const prisma = new PrismaClient();

async function createAccount(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const hashPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  redirect("/portal/sign-in");
}

async function login(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    redirect("/portal/sign-in");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    redirect("/portal/sign-in");
  }

  await AuthService.createSessionToken({
    sub: user.id,
    name: user.name,
    email: user.email,
  });

  redirect("/portal");
}

async function loginGoogle(user: User) {
  "use server";

  await AuthService.createSessionToken({
    sub: user.providerId,
    name: user.displayName,
    email: user.email,
  });

  redirect("/portal");
}

const AuthActions = {
  createAccount,
  login,
  loginGoogle,
};

export default AuthActions;
