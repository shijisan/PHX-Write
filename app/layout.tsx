import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DarkModeProvider } from "@/components/Providers/DarkModeProvider";
import { MDNotesProvider } from "@/components/Providers/MDNotesProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PHX-Write:re",
  description: "I actually got a brain now, just lazier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MDNotesProvider>
          <DarkModeProvider>
            <SidebarProvider
              defaultOpen
            >
              <AppSidebar />
              {children}
            </SidebarProvider>
          </DarkModeProvider>
        </MDNotesProvider>
      </body>
    </html>
  );
}
