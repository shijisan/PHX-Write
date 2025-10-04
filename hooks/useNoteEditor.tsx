"use client";

import { useState, useEffect } from "react";

export type Note = {
  id: string;
  content: string;
  createdAt: number;
};

export function useNoteEditor(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  const [notes, setNotes] = useState<Note[]>([]);

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

  const saveNotes = (newNotes: Note[]) => {
    localStorage.setItem("storedNotes", JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const toggle = () => setIsOpen((v) => !v);
  const close = () => setIsOpen(false);


  return {
    isOpen,
    toggle,
    close,
    notes,
    setNotes,
    saveNotes,
    fetchNotes,
  };
}
