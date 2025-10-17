"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Encryption from "../Auth/Encryption";
import { useState } from "react";

export default function PasskeyProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { data: session } = useSession();

    const [passKey, setPassKey] = useState<string | null>(
        typeof window !== "undefined" ? sessionStorage.getItem("passKey") : null
    );

    if (session?.user && (pathname === "/notes" || pathname === "/docs") && !passKey) {
        return (
            <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0">
                <Encryption />
            </div>
        );
    }

    return <>{children}</>;
}
