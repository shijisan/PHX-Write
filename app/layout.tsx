import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DarkModeProvider } from "@/components/Providers/DarkModeProvider";
import { MDNotesProvider } from "@/components/Providers/MDNotesProvider";
import AuthSessionProvider from "@/components/Providers/AuthSessionProvider";

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
        <AuthSessionProvider>
          <MDNotesProvider>
            <DarkModeProvider>
              <SidebarProvider
                defaultOpen
                className="md:flex-row flex-col flex"
              >
                <header className="flex items-center md:hidden py-3 shadow-sm shadow-foreground/10 bg-sidebar">

                  <SidebarTrigger />
                  <h1 className="mx-auto font-medium">PHX-Write</h1>
                </header>
                <AppSidebar />
                {children}
              </SidebarProvider>
            </DarkModeProvider>
          </MDNotesProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
