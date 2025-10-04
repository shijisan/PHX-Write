"use client";

import { useState } from "react";

    export default function useMDEditor(){
        const [MDValue, setMDValue] = useState<string | undefined>("");
        return {MDValue, setMDValue};
    }
