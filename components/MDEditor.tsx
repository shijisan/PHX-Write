"use client"

import dynamic from "next/dynamic";
import useMDEditor from "@/hooks/useMDEditor";

const InitMDEditor = dynamic(() => import("@uiw/react-md-editor"), {ssr: false});

export default function MDEditor(){

    const {MDValue, setMDValue} = useMDEditor();

    return(
        <>
        <div>
            <InitMDEditor value={MDValue} onChange={setMDValue} />
        </div>
        </>
    )
}