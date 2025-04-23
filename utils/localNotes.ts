const LOCAL_STORAGE_KEY = "notes";

export const getLocalNotes = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  const notes = stored ? JSON.parse(stored) : [];

  return notes.map((note: any) => ({
    ...note,
    isLocalOnly: true,
  }));
};


export const saveLocalNotes = (notes: any[]) => {
    const cleanedNotes = notes.map(({ isLocalOnly, ...note }) => note);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanedNotes));
  };
  