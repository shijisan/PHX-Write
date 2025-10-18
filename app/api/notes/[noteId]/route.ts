import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ noteId: string }> }
) {
  const { noteId } = await context.params;

  if (!noteId) {
    return NextResponse.json({ message: "Note ID missing" }, { status: 400 });
  }

  try {
    await prisma.note.delete({
      where: { id: noteId },
    });

    return NextResponse.json({ message: "Successfully deleted note" }, { status: 200 });
  } catch (err) {
    console.error("Delete failed:", err);
    return NextResponse.json({ message: "Failed to delete note" }, { status: 500 });
  }
}
