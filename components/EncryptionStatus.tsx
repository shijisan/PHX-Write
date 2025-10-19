"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button";
import { Shield, ShieldOff } from "lucide-react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function EncryptionStatus() {

    const {status} = useSession();
    const router = useRouter();

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={status === "authenticated" ? "text-green-200 hover:text-green-100" : "text-red-200 hover:text-red-100"}
                        onClick={() => router.push("/account")}
                    >
                        {status === "authenticated" ? <Shield/> : <ShieldOff />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Sign In to Encrypt
                </TooltipContent>
            </Tooltip>
        </>
    )
}