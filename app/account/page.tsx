"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Account() {

    const router = useRouter();

    const { data: session } = useSession();

    return (
        <>
            <main className="pt-[8vh] bg-indigo-1000 w-full min-h-screen flex justify-center items-center">
                <div className="max-w-md w-full bg-indigo-500/50 rounded-md">
                    <div>
                        <h1 className="text-3xl text-center poppins md:px-8 px-4 md:pt-8 pt-4">Your Account</h1>
                    </div>
                    <div className="flex flex-col space-y-4 md:p-8 p-4 ">
                        <div>
                            <h3 className="poppins">User Id</h3>
                            <p className="ps-4 bg-foreground text-background py-2 rounded-sm">{session?.user.id}</p>
                        </div>
                        <div>
                            <h3 className="poppins">Email</h3>
                            <p className="ps-4 bg-foreground text-background py-2 rounded-sm">{session?.user.email}</p>
                        </div>
                        <div>
                            <h3 className="poppins">Username</h3>
                            <p className="ps-4 bg-foreground text-background py-2 rounded-sm">{session?.user.username}</p>
                        </div>
                        <button className="bg-orange-500" onClick={async () => {await signOut({ redirect: false });router.push("/auth");}}>Log Out</button>
                    </div>


                </div>
            </main>
        </>
    )
}