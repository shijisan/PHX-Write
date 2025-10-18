"use client";

import { useState, useEffect } from "react";

export type Docs = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
};

export function useMDEditor(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  const [docs, setDocs] = useState<Docs[]>([]);
  const [targetDoc, setTargetDoc] = useState<Docs | null>(null);

  const fetchDocs = () => {
    try {
      const stored = localStorage.getItem("storedDocs");
      if (stored) {
        const parsed = JSON.parse(stored);
        setDocs(parsed);
      }
    } catch (e) {
      console.error("Error parsing docs", e);
    }
  };

  const saveDocs = (doc: Docs) => {
    try {
      const stored = localStorage.getItem("storedDocs");
      const docs: Docs[] = stored ? JSON.parse(stored) : [];

      const existingIndex = docs.findIndex((d) => d.id === doc.id);

      if (existingIndex !== -1) {
        docs[existingIndex] = doc;
      } else {
        docs.push(doc);
      }

      localStorage.setItem("storedDocs", JSON.stringify(docs));
      setDocs(docs);
    } catch (err) {
      console.error("Error saving doc", err);
    }
  };

  const toggle = () => setIsOpen((v) => !v);
  const close = () => {
    setTargetDoc(null);
    setIsOpen(false);
  };

  const readDoc = (docId: string) => {
    try {
      const stored = localStorage.getItem("storedDocs");
      if (!stored) return;

      const parsed: Docs[] = JSON.parse(stored);
      const found = parsed.find((d) => d.id === docId);

      if (found) {
        setTargetDoc(found);
        setIsOpen(true);
      } else {
        console.warn("Doc not found", docId);
      }
    } catch (err) {
      console.error("Error viewing doc", err);
    }
  };

  const deleteDoc = (docId: string) => {
    setDocs((prev) => {
      const updated = prev.filter((doc) => doc.id !== docId);
      localStorage.setItem("storedDocs", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return {
    isOpen,
    toggle,
    close,
    docs,
    setDocs,
    saveDocs,
    fetchDocs,
    readDoc,
    targetDoc,
    deleteDoc,
  };
}
