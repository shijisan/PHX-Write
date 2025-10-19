"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { Note } from "@/hooks/useNoteEditor";

import { Card, CardAction, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

export default function SyncPrompt({
    syncNotes
}: {
    syncNotes: () => void;
}) {

    const { status } = useSession();
    const [syncPromptOpen, setSyncPromptOpen] = useState(true);
    const [localNotesFound, setLocalNotesFound] = useState<Note[]>([]);

    const handleSyncNotes = async() => {
        syncNotes();
        setSyncPromptOpen(false);
    }

    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem("storedNotes") || "[]");
        setLocalNotesFound(notes);
    }, []);


    if (status === "authenticated" && localNotesFound.length > 0 && syncPromptOpen) {
        return (
            <>
                <div className="w-full h-screen bg-black/10 flex items-center justify-center fixed left-0 top-0 z-20">

                    <Card className="max-w-sm">

                        <CardHeader>
                            <CardTitle>Sync Local Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Local notes were detected on your device. Would you like to upload them to the cloud?
                            </CardDescription>
                        </CardContent>

                        <CardFooter>
                            <CardAction className="flex gap-3 ml-auto">
                                <Button
                                    variant="ghost"
                                    onClick={() => setSyncPromptOpen(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="default"
                                    onClick={handleSyncNotes}
                                >
                                    Confirm
                                </Button>

                            </CardAction>
                        </CardFooter>

                    </Card>

                </div>
            </>
        )
    }

}