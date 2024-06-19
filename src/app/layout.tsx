import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import openDB from "../configdb";

const inter = Inter({ subsets: ["latin"] });

openDB();

export const metadata: Metadata = {
  title: "Project Base",
  description: "Study - FullStack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
