"use client"

import { useState } from "react"
import { FaBars } from "react-icons/fa"
import Image from "next/image";
import Link from "next/link";

export default function Nav(){

    const [mobile, setMobile] = useState<boolean>(false);
 
    return(
        <>
        <nav className="h-[8vh] w-full fixed top-0 left-0 flex items-center md:px-[10vw] border-b border-b-foreground/50 z-50 bg-neutral-900/50 backdrop-blur-xs">
            <div className="md:w-1/2 w-full flex gap-2 items-center">
                <Image width={40} height={40} src="logo.svg" alt="phx-write logo" />
                <h1 className="md:text-4xl poppins font-medium">PHX-WRITE</h1>
            </div>

            <div className="md:hidden block">
                <button type="button" onClick={() => setMobile(!mobile)}>
                    <FaBars />
                </button>
            </div>

            <ul className={`md:flex-row flex-col md:flex md:w-1/2 w-full justify-evenly md:static fixed top-[8vh] left-0 text-center md:h-full h-screen md:bg-transparent bg-black/90 items-center ${mobile ? "flex" : "hidden"}`}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/notes">Notes</Link>
                </li>
                <li>
                    <Link href="/account">Account</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}
