"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { Card, CardAction, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Account() {

    const { data: session } = useSession();

    return (
        <>
            <main className="flex md:flex-row flex-col p-8 gap-6">
                <Card>
                    <CardContent>
                        <Image
                            src={session?.user?.image || "https://placehold.co/200/avif"}
                            height={200}
                            width={200}
                            alt={session?.user?.name || "User"}
                            className="size-32 rounded-full"
                        />

                        <p>{session?.user?.name}</p>
                        <p>{session?.user?.email}</p>
                        <CardAction className="flex-col flex gap-2 w-full mt-4" >
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => signOut()}
                            >
                                Sign Out
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                            >
                                Delete Account
                            </Button>
                        </CardAction>
                    </CardContent>

                </Card>
            </main>
        </>
    )
}