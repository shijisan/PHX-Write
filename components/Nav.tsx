"use client"

import { useState } from "react"
import { FaBars } from "react-icons/fa"
import Image from "next/image";

export default function Nav(){

    const [mobile, setMobile] = useState<boolean>(false);
 
    return(
        <>
        <nav className="h-[8vh] w-full fixed top-0 left-0 flex items-center md:px-[10vw] border-b border-b-foreground/50 z-50 bg-indigo-1000">
            <div className="md:w-1/2 w-full flex gap-2 items-center">
                <Image width={40} height={40} src="logo.svg" alt="phx-write logo" />
                <h1 className="md:text-4xl poppins font-medium">PHX-WRITE</h1>
            </div>

            <div className="md:hidden block">
                <button type="button" onClick={() => setMobile(!mobile)}>
                    <FaBars />
                </button>
            </div>

            <ul className={`md:flex-row flex-col flex md:w-1/2 w-full justify-evenly md:static fixed top-[8vh] left-0 text-center h-full md:bg-transparent bg-black/90 items-center ${mobile ? "hidden" : "flex"}`}>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/notes">Notes</a>
                </li>
                <li>
                    <a href="/account">Account</a>
                </li>
            </ul>
        </nav>
        </>
    )
}