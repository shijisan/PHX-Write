import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/auth/SessionWrapper";
import Nav from "@/components/Nav";
import { Toaster } from "react-hot-toast";

const robotoFlex = Roboto_Flex({
  weight: "variable",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PHX-Write",
  description: "A privacy-focused, offline-first notes app with E2E encryption, seamless local-to-cloud migration, and a clean minimalist UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoFlex.className} antialiased`}
      >
        <SessionWrapper>
          <Nav />
          <Toaster containerClassName="mt-[8vh]" position="top-right" />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
