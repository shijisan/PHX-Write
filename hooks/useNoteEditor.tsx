"use client";

import { useState, useEffect } from "react";

export type Note = {
  id: string;
  content: string;
  createdAt: number;
  type: "wysiwyg" | "markdown";
};

export function useNoteEditor(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  const [notes, setNotes] = useState<Note[]>([]);
  const [targetNote, setTargetNote] = useState<Note | null>(null);

  const fetchNotes = () => {
    try {
      const stored = localStorage.getItem("storedNotes");
      if (stored) {
        const parsed = JSON.parse(stored);
        setNotes(parsed);
      }
    } catch (e) {
      console.error("Error parsing notes", e);
    }
  };

  const saveNotes = (note: Note) => {
    try {
      const stored =  localStorage.getItem("storedNotes");
      let notes: Note[] = stored ? JSON.parse(stored) : [];
    
      const existingIndex = notes.findIndex((n) => n.id === note.id);

      if (existingIndex !== -1) {
        notes[existingIndex] = note;
      } else {
        notes.push(note);
      }

      localStorage.setItem("storedNotes", JSON.stringify(notes));
      setNotes(notes);

    } catch (err) {
      console.error("error saving note", err);
    }
  };

  const toggle = () => setIsOpen((v) => !v);
  const close = () => {
    setTargetNote(null);
    setIsOpen(false);   
  };

  const readNote = (noteId: string) => {
    try {
      const stored = localStorage.getItem("storedNotes");
      if (!stored) return;

      const parsed: Note[] = JSON.parse(stored);
      const found = parsed.find((n) => n.id === noteId);

      if (found) {
        setTargetNote(found);
        setIsOpen(true);
      } else {
        console.warn("note not found", noteId);
      }
    } catch (err) {
      console.error("error viewing note", err);
    }
  };

  const deleteNote = (noteId: string) => {
    setNotes((prev) => {
      const updated = prev.filter((note) => note.id !== noteId);
      localStorage.setItem("storedNotes", JSON.stringify(updated));
      return updated;
    }
  )};

  useEffect(() => {
    fetchNotes();
  }, []);


  return {
    isOpen,
    toggle,
    close,
    notes,
    setNotes,
    saveNotes,
    fetchNotes,
    readNote,
    targetNote,
    deleteNote
  };
}
