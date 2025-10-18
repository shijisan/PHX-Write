"use client";

import { useState, useEffect, useCallback } from "react";
import { saveCloudNote, fetchCloudNotes, deleteCloudNote } from "@/lib/cloudNotes";
import { useSession } from "next-auth/react";
import { decryptString } from "@/lib/decryptString";

export type Note = {
	id: string;
	content: string;
	createdAt: number;
	type: "wysiwyg" | "markdown";
};

export type CloudNote = {
	id: string;
	content: string;
	createdAt: number;
	type: "wysiwyg" | "markdown";
	salt: string;
	iv: string;
}

export function useNoteEditor(initial = false) {
	const [isOpen, setIsOpen] = useState(initial);
	const [notes, setNotes] = useState<Note[]>([]);
	const [targetNote, setTargetNote] = useState<Note | null>(null);
	const { status } = useSession();

	const fetchNotes = useCallback(
		async () => {
			try {
				let parsed: Note[] = [];

				if (status === "unauthenticated") {
					const stored = localStorage.getItem("storedNotes");
					if (stored) parsed = JSON.parse(stored);
				} else if (status === "authenticated") {
					const cloudNotes = await fetchCloudNotes();

					if (cloudNotes && typeof window !== "undefined") {
						const passKey = sessionStorage.getItem("passKey");
						if (!passKey) {
							console.error("No passkey found for decryption");
							return;
						}
						const decryptedNotes = await Promise.all(
							cloudNotes.map(async (note: CloudNote) => {
								try {
									const decryptedContent = await decryptString(
										note.content,
										note.iv,
										note.salt,
										passKey
									);
									return {
										...note,
										content: decryptedContent ?? "",
									};
								} catch (err) {
									console.error(`Failed to decrypt note ${note.id}`, err);
									return note;
								}
							})
						);

						parsed = decryptedNotes;
					}
				}

				setNotes(parsed);
			} catch (e) {
				console.error("Error fetching notes", e);
			}
		}, [status]);

	const saveNotes = async (note: Note) => {
		try {
			let updatedNotes: Note[] = [];

			if (status === "unauthenticated") {
				const stored = localStorage.getItem("storedNotes");
				const notes: Note[] = stored ? JSON.parse(stored) : [];
				const existingIndex = notes.findIndex((n) => n.id === note.id);

				if (existingIndex !== -1) notes[existingIndex] = note;
				else notes.push(note);

				localStorage.setItem("storedNotes", JSON.stringify(notes));
				updatedNotes = notes;
			} else if (status === "authenticated") {
				await saveCloudNote(note);

				updatedNotes = notes.map((n) =>
					n.id === note.id ? note : n
				);

				if (!updatedNotes.some((n) => n.id === note.id)) {
					updatedNotes.push(note);
				}
			}

			setNotes(updatedNotes);
		} catch (err) {
			console.error("error saving note", err);
		}
	};


	const readNote = (noteId: string) => {
		const found = notes.find((n) => n.id === noteId);
		if (found) {
			setTargetNote(found);
			setIsOpen(true);
		} else {
			console.warn("note not found", noteId);
		}
	};

	const deleteNote = async (noteId: string) => {
		try {
			if (status === "unauthenticated") {
				setNotes((prev) => {
					const updated = prev.filter((note) => note.id !== noteId);
					localStorage.setItem("storedNotes", JSON.stringify(updated));
					return updated;
				});
			} else if (status === "authenticated") {
				await deleteCloudNote(noteId);
				await fetchNotes();

			}
		} catch (err) {
			console.error("Error deleting note:", err);
		}
	};


	const toggle = () => setIsOpen((v) => !v);
	const close = () => {
		setTargetNote(null);
		setIsOpen(false);
	};

		useEffect(() => {
			fetchNotes();
		}, [fetchNotes]);

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
		deleteNote,
	};
}
