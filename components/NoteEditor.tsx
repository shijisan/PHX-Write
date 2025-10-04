"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { v4 as uuid } from "uuid";
import type {Note} from "@/hooks/useNoteEditor.tsx"

import { Button } from "./ui/button";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function NoteEditor({
  isOpen,
  close,
  notes,
  saveNotes,
}: {
  isOpen: boolean;
  close: () => void;
  notes: Note[];
  saveNotes: (notes: Note[]) => void;
}) {

  const [value, setValue] = useState("");

      const handleAdd = (textValue: string) => {
        const newNote = {
            id: uuid(),
            content: textValue,
            createdAt: Date.now(),
        }
        const updatedNotes = [...notes, newNote];
        saveNotes(updatedNotes);
    }

  return (
    <>
      {isOpen && (
        <>
        <div
        className="w-full h-screen bg-foreground/10 flex items-center justify-center fixed left-0 top-0"
        >

          <div className="max-w-xl z-30 bg-secondary rounded-lg">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
            />
            <div className="border border-[#ccc] border-t-0 flex rounded-b-lg py-2 px-6">
              <Button
                variant="outline"
                className="ml-auto"
                onClick={() => {handleAdd(value); close(); setValue("");}}
              >
                Close
              </Button>
            </div>
          </div>

        </div>

        </>
      )
      }
    </>
  );
}
