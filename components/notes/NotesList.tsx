"use client";

export default function NotesList({
	notes,
	onNoteClick,
}: {
	notes: { id: string; content: string; modifiedAt: string; isLocalOnly?: boolean }[];
	onNoteClick: (note: { id: string; content: string }) => void;
}) {
	return (
		<>
			<ul className="grid md:grid-cols-4 md:gap-8 gap-4 quill-texts">
				{notes.length == 0 ? (
					<li>No notes created yet</li>
				) : (
					notes.map((note) => (
						<li
							className="bg-neutral-700 rounded-md md:p-8 p-4 hover:cursor-pointer hover:brightness-110 hover:scale-105 transition-all flex-col border border-indigo-50/50"
							onClick={() => onNoteClick(note)}
							key={note.id}
						>
							{note.content == "" ? (
								<p className="text-foreground/50">empty note</p>
							) : (
								<>
									<p dangerouslySetInnerHTML={{ __html: note.content }} />
									<p className="text-sm text-foreground/50">
										Last Modified on: {new Date(note.modifiedAt! || Date.now()).toDateString()}
									</p>
									{/* Marker for local-only notes */}
									{note.isLocalOnly && (
										<span className="text-xs text-red-500 font-semibold mt-2 inline-block">
											Local Only
										</span>
									)}
								</>
							)}
						</li>
					))
				)}
			</ul>
		</>
	);
}
