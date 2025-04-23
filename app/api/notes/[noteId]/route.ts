import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { generateEncryptionKey, encryptText } from "@/utils/crypto";

// PATCH: Modify note content with encryption
export async function PATCH(req: Request) {
  const { editingNoteId, content }: { editingNoteId: string, content: string } = await req.json();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const encryptionKey = generateEncryptionKey(user.encryptedKey, user.salt);

    const encryptedContent = encryptText(content, encryptionKey);

    const modifyNote = await prisma.note.update({
      where: { id: editingNoteId },
      data: { content: encryptedContent, modifiedAt: new Date() }
    });

    return NextResponse.json(modifyNote);
  } catch (error) {
    return NextResponse.json({ message: "Failed to modify note", error }, { status: 500 });
  }
}


export async function DELETE(req: Request){
    const {editingNoteId} = await req.json();

    try{
        await prisma.note.delete({
            where:{
                id: editingNoteId
            }
        })
    
        return NextResponse.json({message: "Note deleted succesfully"}, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "Failed to delete note", error}, {status: 500});
    }

}