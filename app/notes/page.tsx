"use client";

import NoteEditor from "@/components/NoteEditor";
import { useNoteEditor } from "@/hooks/useNoteEditor";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Notes() {

    const { isOpen, toggle, close, notes, saveNotes } = useNoteEditor();

    return (
        <>
            <main className="bg-secondary flex flex-col w-full p-8">
                <div
                    className="flex"
                >
                    <h1
                        className="text-3xl font-semibold"
                    >
                        User's Notes
                    </h1>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggle}
                        className="ml-auto"
                    >
                        <Plus />
                    </Button>
                </div>
                <ul className="mt-4 grid md:grid-cols-5 gap-8">
                    {notes.length > 0 ? (
                        <>
                            {notes.map((note) => (
                                <li
                                    key={note.id}
                                >
                                    <Card
                                    className="aspect-square shadow-lg hover:scale-[101%] transition-transform"
                                    >
                                        <CardContent>
                                            <div 
                                            className="noteText" 
                                            dangerouslySetInnerHTML={{ __html: note.content }} 
                                            />
                                        </CardContent>
                                    </Card>
                                </li>

                            ))}
                        </>
                    ) : (<>No notes yet...</>)
                    }
                </ul>
                <NoteEditor close={close} isOpen={isOpen} notes={notes} saveNotes={saveNotes} />
            </main>
        </>
    )
}