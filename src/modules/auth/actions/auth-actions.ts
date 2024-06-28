import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import AuthService from "../services/auth-service";

const prisma = new PrismaClient();

async function createAccount(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const hashPassword = await bcrypt.hash(password, 10);

  await prisma.user
    .create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    })
    .then(() => {
      redirect("/portal/sign-in");
    });
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
    return true;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return true;
  }

  await AuthService.createSessionToken({
    sub: user.id,
    name: user.name,
    email: user.email,
  });

  redirect("/portal");
}

async function loginGoogle(uid: string, name: string, email: string) {
  "use server";

  await AuthService.createSessionToken({
    sub: uid,
    name: name,
    email: email,
  });

  redirect("/portal");
}

const AuthActions = {
  createAccount,
  login,
  loginGoogle,
};

export default AuthActions;
