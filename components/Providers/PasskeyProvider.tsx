"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Encryption from "../Auth/Encryption";
import { useEffect, useState } from "react";

export default function PasskeyProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const { status } = useSession();
	const [passKey, setPassKey] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedKey = sessionStorage.getItem("passKey");
			if (storedKey && storedKey !== passKey) {
				setPassKey(storedKey);
			}
		}
	}, [passKey]);

	const isProtectedRoute = pathname === "/notes" || pathname === "/docs";
	const shouldAskPasskey = status === "authenticated" && isProtectedRoute && !passKey;

	if (shouldAskPasskey) {
		return (
			<div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 bg-background">
				<Encryption onSuccess={(key: string) => setPassKey(key)} />
			</div>
		);
	}

	return <>{children}</>;
}
