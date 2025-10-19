"use client";

import NoteEditor from "@/components/NoteEditor";
import { useNoteEditor } from "@/hooks/useNoteEditor";

import { Button } from "@/components/ui/button";
import { Plus, EllipsisVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import EncryptionStatus from "@/components/EncryptionStatus";
import SyncPrompt from "@/components/Auth/SyncPrompt";

export default function Notes() {

    const { isOpen, toggle, close, notes, saveNotes, readNote, targetNote, deleteNote, syncNotes } = useNoteEditor();

    return (
        <>
            <main className="bg-[var(--main-bg)] flex flex-col w-full min-h-screen">
                <div className="flex bg-sidebar p-8 border-b">
                    <h1 className="md:text-3xl text-2xl font-semibold">
                        User&apos;s Notes
                    </h1>
                    <div className="ml-auto flex gap-3">
                        <EncryptionStatus />
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggle}
                            className="ml-auto"
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
                <ul className="mt-4 grid md:grid-cols-5 gap-8">
                    {notes.length > 0 ? (
                        <>
                            {notes.map((note) => (
                                <li key={note.id} className="relative group">
                                    <Card className="aspect-square shadow-lg hover:scale-[101%] transition-transform bg-card cursor-pointer">
                                        <CardContent 
                                            className="relative"
                                            onClick={() => readNote(note.id)}
                                        >
                                            <div
                                                className="noteText aspect-auto h-64 overflow-clip text-clip"
                                                dangerouslySetInnerHTML={{ __html: note.content }}
                                            />
                                            
                                            <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                <Popover modal={false}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <EllipsisVertical className="h-4 w-4" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent 
                                                        side="bottom" 
                                                        align="end"
                                                        className="w-auto p-2"
                                                        sideOffset={5}
                                                    >
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
                                                                    size="sm"
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Deleting note</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action is irreversible and will permanently delete this note.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                                            e.stopPropagation();
                                                                            deleteNote(note.id);
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </li>
                            ))}
                        </>
                    ) : (
                    <>
                    <div className="p-8">
                        <p>No notes yet...</p>
                    </div>
                    </>
                    )
                    }
                </ul>

                <NoteEditor close={close} isOpen={isOpen} saveNotes={saveNotes} targetNote={targetNote} />
                <SyncPrompt syncNotes={syncNotes} />
            </main>
        </>
    )
}