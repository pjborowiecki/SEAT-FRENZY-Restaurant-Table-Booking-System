import "@/styles/globals.css";
import type { Metadata } from "next";
import { fontInter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Restaurant Booking System",
  description:
    "A restaraunt booking system, built with Next.js and Prisma ORM (PostgreSQL)",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={fontInter.className}>{children}</body>
    </html>
  );
}
