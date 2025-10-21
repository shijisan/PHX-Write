"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { v4 as uuid } from "uuid";
import type { Note } from "@/hooks/useNoteEditor";
import "react-quill-new/dist/quill.snow.css";


import { useMDNotes } from "@/components/Providers/MDNotesProvider";
import { Button } from "./ui/button";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

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
	const { enabled: mdEnabled } = useMDNotes();

	const [value, setValue] = useState("");
	const [useMarkdown, setUseMarkdown] = useState(false);
	const skipNextChange = useRef(false);

	const { enabled } = useMDNotes();

	useEffect(() => {
		setUseMarkdown(mdEnabled);
	}, [mdEnabled]);

	useEffect(() => {
		if (targetNote) {
			setValue(targetNote.content);
			skipNextChange.current = true;
		} else {
			setValue("");
		}
	}, [targetNote]);

	const handleChange = (v: string | undefined) => {
		if (skipNextChange.current) {
			skipNextChange.current = false;
			return;
		}
		setValue(v || "");
	};

	const handleSave = () => {

		if (value !== "<p><br></p>" && value !== "") {

			const note: Note = {
				id: targetNote?.id || uuid(),
				content: value,
				createdAt: Date.now(),
				type: enabled ? "markdown" : "wysiwyg",
			};

			saveNotes(note);
			setValue("");
			close();

		} else {
			close();
		}

	};

	if (!isOpen) return null;

	return (
		<div className="w-full h-screen bg-black/10 flex items-center justify-center fixed left-0 top-0 z-20">
			<div className="max-w-xl w-full bg-secondary rounded-lg shadow-lg">
				{useMarkdown || targetNote?.type === "markdown" ? (
					<div className="p-2 border border-[#ccc] rounded-t-lg">
						<MDEditor value={value} onChange={handleChange} height={400} />
					</div>
				) : (
					<ReactQuill theme="snow" value={value} onChange={handleChange} />
				)}

				<div className="border border-[#ccc] border-t-0 flex rounded-b-lg py-2 px-6">
					<Button variant="outline" className="ml-auto" onClick={handleSave}>
						Close
					</Button>
				</div>
			</div>
		</div>
	);
}
