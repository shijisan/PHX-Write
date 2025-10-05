"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { v4 as uuid } from "uuid";
import type { Note } from "@/hooks/useNoteEditor";

import { Button } from "./ui/button";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function NoteEditor({
  isOpen,
  close,
  saveNotes,
  targetNote,
}: {
  isOpen: boolean;
  close: () => void;
  saveNotes: (note: Note) => void;
  targetNote: Note | null;
}) {
  const [value, setValue] = useState("");
  const skipNextChange = useRef(false);

  useEffect(() => {
    if (targetNote) {
      setValue(targetNote.content);
      skipNextChange.current = true; 
    } else {
      setValue("");
    }
  }, [targetNote]);

  const handleChange = (v: string) => {
    if (skipNextChange.current) {             // avoid saving quill's default empty paragraph value before loading content 
      skipNextChange.current = false;
      return;
    }
    setValue(v);
  };

  const handleSave = () => {
    if (targetNote) {
      const updatedNote: Note = {
        ...targetNote,
        content: value,
        createdAt: Date.now(),
      };
      saveNotes(updatedNote);
    } else {
      const newNote: Note = {
        id: uuid(),
        content: value,
        createdAt: Date.now(),
      };
      saveNotes(newNote);
    }

    setValue("");
    close();
  };

  return (
    <>
      {isOpen && (
        <div className="w-full h-screen bg-black/10 flex items-center justify-center fixed left-0 top-0 z-20">
          <div className="max-w-xl w-full bg-secondary rounded-lg shadow-lg">
            <ReactQuill theme="snow" value={value} onChange={handleChange} />
            <div className="border border-[#ccc] border-t-0 flex rounded-b-lg py-2 px-6">
              <Button
                variant="outline"
                className="ml-auto"
                onClick={handleSave}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
