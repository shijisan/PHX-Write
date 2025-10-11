import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button";
import { ShieldOff } from "lucide-react";

export default function EncryptionStatus(){
    return(
        <>
        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="outline"
                                size="icon"
                                className="text-red-200 hover:text-red-100"
                                >
                                    <ShieldOff />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Unencrypted
                            </TooltipContent>
                        </Tooltip>
        </>
    )
}