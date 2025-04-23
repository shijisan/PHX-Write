"use client";

import { useState, useEffect } from "react";
import NotesList from "@/components/notes/NotesList";
import dynamic from "next/dynamic";
import { FaTrash, FaTimes, FaPlus } from "react-icons/fa";
import { FaCloudArrowUp } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { getLocalNotes, saveLocalNotes } from "@/utils/localNotes";
import toast from "react-hot-toast";
import { Note } from "@prisma/client";

import 'react-quill-new/dist/quill.snow.css';


// Dynamically import ReactQuill, disable SSR
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function Notes() {
	const [modalOpen, setModalOpen] = useState(false);
	const [noteContent, setNoteContent] = useState<string>("");
	const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

	const [notes, setNotes] = useState<{ id: string, content: string, modifiedAt: string, isLocalOnly?: boolean }[]>([]);

	const { data: session } = useSession();

	useEffect(() => {
		const loadNotes = async () => {
			const local = getLocalNotes();
			let online: typeof local = [];

			if (session) {
				const res = await fetch("/api/notes");
				const data: Omit<Note, "isLocalOnly">[] = await res.json();
				online = data.map(note => ({ ...note, isLocalOnly: false }));
			}

			setNotes([...local, ...online]);
		};

		loadNotes();
	}, [session]);


	const fetchNotes = async () => {
		const res = await fetch("/api/notes", {
			method: "GET",
		});

		const data = await res.json();
		setNotes(data);
	};

	// Update the onChange handler to match the ReactQuill signature
	const handleNoteModify = (value: string) => {
		setNoteContent(value);

		if (editingNoteId && value.trim() !== "") {
			if (session) {
				const res = fetch(`/api/notes/${editingNoteId}`, {
					method: "PATCH",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						editingNoteId,
						content: value,
					}),
				});

				res.then(async (response) => {
					const updatedNote = await response.json();
					setNotes((prev) =>
						prev.map((note) =>
							note.id === editingNoteId
								? { ...note, content: value, modifiedAt: updatedNote.modifiedAt }
								: note
						)
					);
				});
			}
			else {
				const updatedNotes = notes.map(note =>
					note.id === editingNoteId
						? { ...note, content: value, modifiedAt: new Date().toISOString() }
						: note
				);
				saveLocalNotes(updatedNotes);
				setNotes(updatedNotes);
			}
		}
	};

	const handleCreateNote = async () => {
		if (session) {
			try {
				const res = await fetch(`/api/notes/`, {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						content: "",
					}),
				});

				const newNote = await res.json();
				setEditingNoteId(newNote.id);
				setNoteContent("");
				setModalOpen(true);
				setNotes((prev) => [newNote, ...prev]);
			} catch (err) {
				console.error(err);
			}
		}
		else {
			const newNote = {
				id: Date.now().toString(),
				content: "",
				modifiedAt: new Date().toISOString(),
			};
			const updated = [newNote, ...notes];
			saveLocalNotes(updated);
			setNotes(updated);
			setEditingNoteId(newNote.id);
			setNoteContent("");
			setModalOpen(true);
		}
	};

	const handleNoteClick = (note: { id: string; content: string }) => {
		setEditingNoteId(note.id);
		setNoteContent(note.content);
		setModalOpen(true);
	};

	const handleDeleteNote = async () => {
		if (session) {
			try {
				const res = await fetch(`/api/notes/${editingNoteId}`, {
					method: "DELETE",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						editingNoteId,
					}),
				});

				if (res.ok) {
					fetchNotes();
					setModalOpen(false);
					toast.success("Deleted note successfully!");

				}
			} catch (err) {
				console.error(err);
			}
		}
		else {
			const updated = notes.filter((note) => note.id !== editingNoteId);
			saveLocalNotes(updated);
			setNotes(updated);
			setModalOpen(false);
			toast.success("Deleted note successfully!");

		}
	};

	const handleMigrateNote = async (note: { id: string; content: string; }) => {
		if (!session) return;

		const res = await fetch("/api/notes", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ content: note.content }),
		});

		if (res.ok) {
			const newNote = await res.json();
			const updated = notes.filter((n) => n.id !== note.id || !n.isLocalOnly);
			saveLocalNotes(updated.filter((n) => n.isLocalOnly));
			setNotes([newNote, ...updated]);
			toast.success("Note migrated successfully!");
		}
	};


	return (
		<>
			<main className="min-h-screen w-full bg-neutral-950 pt-[8vh]">
				<div className="md:w-full w-fit px-[10vw] z-10 fixed h-[8vh] flex items-center md:static bottom-0 right-0">
					<button className="bg-orange-500 shadow-lg" onClick={handleCreateNote}>
						<FaPlus className="inline-flex self-center me-1" /> New Note
					</button>
				</div>
				<section className="px-[10vw] md:pt-[9vh] pt-8">
					<NotesList onNoteClick={handleNoteClick} notes={notes} />
				</section>
			</main>

			{modalOpen && (
				<>
					<div className="position fixed z-30 top-0 left-0 bg-black/80 flex justify-center items-center w-full min-h-screen transition-all md:px-0 px-[10vw]">
						<form className="px-0 pt-0 rounded-t-md bg-neutral-800">

							<ReactQuill
								value={noteContent}
								onChange={handleNoteModify}
							/>


							<div className="flex justify-end">
								{editingNoteId && notes.find(n => n.id === editingNoteId)?.isLocalOnly && (
									<button className="w-fit hover:text-green-500" type="button" onClick={() => handleMigrateNote({ id: editingNoteId!, content: noteContent })}><FaCloudArrowUp /></button>

								)}
								<button className="w-fit hover:text-red-500" type="button" onClick={handleDeleteNote}>
									<FaTrash />
								</button>
								<div className="flex justify-end">
									<button className="hover:text-background/50" type="button" onClick={() => setModalOpen(!modalOpen)}>
										<FaTimes />
									</button>
								</div>
							</div>
						</form>
					</div>
				</>
			)}
		</>
	);
}
