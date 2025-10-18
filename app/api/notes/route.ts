import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
    const { noteId, noteContent, noteType, noteCreatedAt, noteSalt, noteIv } = await req.json();
    const session = await auth();

    if (!noteId || !noteContent || !noteType || !noteCreatedAt || !noteSalt || !noteIv) {
        return NextResponse.json({ message: "Incomplete request" }, { status: 400 });
    }

    if (!session) {
        return NextResponse.json({ message: "User unauthenticated" }, { status: 401 });
    }

    if (!session.user.email) {
        return NextResponse.json({ message: "No user email found" }, { status: 400 });
    }


    const userId = await prisma.user.findUnique({
        where: { email: session?.user.email },
        select: { id: true },
    })

    if (!userId) {
        return NextResponse.json({ message: "User Id note found" }, { status: 404 });
    }

    try {
        const saveNotes = await prisma.note.upsert({
            where: {
                id: noteId,
            },
            update: { content: noteContent, type: noteType, iv: noteIv, salt: noteSalt },
            create: {
                id: noteId, content: noteContent, type: noteType, createdAt: new Date(noteCreatedAt), iv: noteIv, salt: noteSalt, userId: userId.id,
            }
        })

        return NextResponse.json({ message: "Successfully saved notes", saveNotes }, { status: 200 });
        
    } catch (err) {
        return NextResponse.json({ message: "Failed to save note", err }, { status: 500 });
    }

}

export async function GET() {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ message: "User unauthenticated" }, { status: 402 });
    }

    if (!session.user.email) {
        return NextResponse.json({ message: "No user email found" }, { status: 404 });
    }


    const fetchNotes = await prisma.note.findMany({
        where: {
            user: {
                email: session.user.email,
            },
        },
    })

    if (!fetchNotes) {
        return NextResponse.json({ message: "No notes found" }, { status: 404 });
    }

    return NextResponse.json(fetchNotes);
}