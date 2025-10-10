"use client";

import { useState, useEffect } from "react";
import MDEditor from "@/components/MDEditor";
import { useMDEditor } from "@/hooks/useMDEditor";
import dynamic from "next/dynamic";
import MarkdownPreview from '@uiw/react-markdown-preview';
import '@uiw/react-markdown-preview/markdown.css';

import { Button } from "@/components/ui/button";
import { Plus, EllipsisVertical } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardAction } from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogHeader, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";


export default function Docs() {

    const { docs, isOpen, toggle, close, saveDocs, targetDoc, readDoc, deleteDoc } = useMDEditor();

    if (isOpen) {
        return (
            <>
                <main className="w-full bg-[var(--main-bg)]">
                    <MDEditor close={close} saveDocs={saveDocs} targetDoc={targetDoc} />
                </main>
            </>
        )
    }

    return (
        <>
            <main className="w-full p-8 bg-[var(--main-bg)]">
                <div className="flex">
                    <h1
                        className="text-3xl"
                    >
                        User's Docs
                    </h1>
                    <Button
                        className="ml-auto"
                        variant="outline"
                        size="icon"
                        onClick={toggle}
                    >
                        <Plus />
                    </Button>
                </div>
                <ul
                    className="mt-4 grid md:grid-cols-5 w-full gap-8"
                >
                    {docs.length > 0 ? (
                        <>
                            {docs.map((doc) => (
                                <li
                                    key={doc.id}
                                    onClick={() => readDoc(doc.id)}
                                    className="size-full hover:scale-[101%] transition-transform relative group"
                                >
                                    <Card className="overflow-hidden">
                                    <CardContent className="size-full flex justify-center items-center">
                                        <div className="relative aspect-[210/297] w-64 overflow-hidden rounded-xs shadow-sm border">
                                        <div className="absolute inset-0 origin-top-left scale-[0.4]">
                                            <MarkdownPreview
                                            source={doc.content}
                                            className="size-[250%] p-4 text-black pointer-events-none select-none"
                                            />
                                        </div>
                                        </div>
                                    </CardContent>
                                    <Separator />
                                    <CardFooter>
                                        {doc.title}
                                    </CardFooter>
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
                                                                    <AlertDialogTitle>Deleting document</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action is irreversible and will permanently delete this document.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                                            e.stopPropagation();
                                                                            deleteDoc(doc.id);
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
                                    </Card>
                                </li>
                            ))}
                        </>
                    ) :
                        <>
                            <p
                                className="text-sm"
                            >
                                No docs yet
                            </p>
                        </>
                    }
                </ul>
            </main>
        </>
    )
}