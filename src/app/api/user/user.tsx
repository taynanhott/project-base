"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(email: string, password: string) {
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });

  return true;
}
