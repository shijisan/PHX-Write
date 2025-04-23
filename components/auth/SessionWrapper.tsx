"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";

export default function SessionWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SessionLoader>{children}</SessionLoader>
    </SessionProvider>
  );
}

// This component handles the loading state
function SessionLoader({ children }: { children: ReactNode }) {
  const { status } = useSession(); // status = "loading" | "authenticated" | "unauthenticated"

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-neutral-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
