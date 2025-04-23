import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { generateEncryptionKey, decryptText, encryptText } from "@/utils/crypto";

// GET: Retrieve and decrypt notes
export async function GET() {

    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const encryptionKey = generateEncryptionKey(user.encryptedKey, user.salt);

    const notes = await prisma.note.findMany({
      where: { userId: user.id }
    });

    const decryptedNotes = notes.map(note => ({
      ...note,
      content: decryptText(note.content, encryptionKey)
    }));

    return NextResponse.json(decryptedNotes);
  } catch (error) {
    return NextResponse.json({ message: "Failed to retrieve notes", error }, { status: 500 });
  }
}



export async function POST(req: Request){
    const { content } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const encryptionKey = generateEncryptionKey(user.encryptedKey, user.salt);
        const encryptedContent = encryptText(content, encryptionKey);

        const newNote = await prisma.note.create({
            data: {
                content: encryptedContent,
                modifiedAt: new Date,
                user: {
                    connect: { id: userId }
                }
            }
        });

        // Return decrypted note to frontend
        return NextResponse.json({
            id: newNote.id,
            content: content // send back the unencrypted version
        });

    } catch (error) {
        return NextResponse.json({ message: "Failed to create note", error }, { status: 500 });
    }
}

