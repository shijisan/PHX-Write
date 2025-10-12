"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Auth() {
    return (
        <>
            <main className="flex items-center justify-center h-screen w-full">
                <Button
                    variant="default"
                    onClick={() => signIn("google", {redirectTo: "/account"})}
                >
                    Sign In with Google
                </Button>
            </main>
        </>
    )
}