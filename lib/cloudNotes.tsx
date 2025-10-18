import { encryptString } from "./encryptString";
import type { Note } from "@/hooks/useNoteEditor";

export async function saveCloudNote(note: Note) {
    try {

        const passKey = sessionStorage.getItem("passKey");

        if (!passKey) {
            console.error("No passkey found");
            return;
        }

        const noteContent = note.content;

        const encryptedNote = await encryptString(noteContent, passKey);

        if (!encryptedNote) {
            console.log("Encryption fail");
            return;
        }

        const res = await fetch("/api/notes", {

            method: "POST",

            headers: {
                "Content-type": "application/json",
            },

            body: JSON.stringify({
                noteId: note.id,
                noteContent: encryptedNote.encryptedContentText,
                noteType: note.type,
                noteCreatedAt: note.createdAt,
                noteSalt: encryptedNote.saltText,
                noteIv: encryptedNote.contentIvText,
            }),
        });

        if (!res.ok) {
            console.error("Failed to save note to cloud", await res.text());
        } else {
            console.log("Note synced to cloud successfull");
        }

    } catch (err) {
        console.log("Failed to save note to cloud", err);
    }
}

export async function fetchCloudNotes() {
    try {

        const res = await fetch("/api/notes");

        if (res.ok) {
            const data = await res.json();
            console.log("Fetching cloud notes sucessful");
            return data;
        }

    } catch (err) {
        console.error("Failed to fetch cloud notes", err);
    }
}

export async function deleteCloudNote(noteId: string) {
    try {
        const res = await fetch(`/api/notes/${noteId}`, {
            method: "DELETE", 
            headers: {
                "Content-type": "application/json",
            },
        });

        if (!res.ok) {
            console.error("Failed to delete note");
        } else {
            console.log("Deleted note from cloud");
            return;
        }
    } catch (err) {
        console.log("Failed to delete note", err);
        return;
    }
}