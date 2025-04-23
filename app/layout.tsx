import type { Metadata } from "next";
import { Roboto_Flex, Poppins } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/auth/SessionWrapper";
import Nav from "@/components/Nav";
import { Toaster } from "react-hot-toast";

// Import Roboto Flex for default font
const robotoFlex = Roboto_Flex({
  weight: "variable",
  subsets: ["latin"],
});

// Import Poppins to use in global CSS
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], 
  subsets: ["latin"],
  variable: "--font-poppins",
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
        className={`${robotoFlex.className} ${poppins.variable} antialiased`}
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
