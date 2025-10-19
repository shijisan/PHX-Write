"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Card, CardAction, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Account() {

    const { data: session, status } = useSession();

    if (status === "unauthenticated") redirect("/auth");

    if (status === "authenticated") {
        return (
        <>
            <main className="flex gap-6 w-full h-screen justify-center items-center">
                <Card>
                    <CardContent className="flex flex-col items-center">
                        <Image
                            src={session?.user?.image || "https://placehold.co/200/avif"}
                            height={200}
                            width={200}
                            alt={session?.user?.name || "User"}
                            className="size-32 rounded-full"
                        />

                        <p>{session?.user?.name}</p>
                        <p>{session?.user?.email}</p>
                        <CardAction className="flex-col flex gap-2 w-full mt-8" >
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => signOut({redirectTo: "/auth"})}
                            >
                                Sign Out
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {alert("Feature on the way!");}}
                            >
                                Delete Account
                            </Button>
                        </CardAction>
                    </CardContent>

                </Card>
            </main>
        </>
    )}
}