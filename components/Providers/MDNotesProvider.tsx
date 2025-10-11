"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface MDNotesContextType {
  enabled: boolean;
  toggle: () => void;
}

const MDNotesContext = createContext<MDNotesContextType | undefined>(undefined);

export function MDNotesProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mdNotes");
    if (stored !== null) setEnabled(stored === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("mdNotes", String(enabled));
  }, [enabled]);

  const toggle = () => setEnabled((prev) => !prev);

  return (
    <MDNotesContext.Provider value={{ enabled, toggle }}>
      {children}
    </MDNotesContext.Provider>
  );
}

export function useMDNotes() {
  const context = useContext(MDNotesContext);
  if (!context) {
    throw new Error("useMDNotes must be used within an MDNotesProvider");
  }
  return context;
}
