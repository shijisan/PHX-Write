import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { encryptString } from "@/lib/encryptString";
import { decryptString } from "@/lib/decryptString";

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 403 });
    }

    const {passKey} = await req.json();

    if (!passKey) {
        return NextResponse.json({ message: "Missing passkey" }, { status: 401 });
    }

    const userEmail = session.user.email;

    if (!userEmail) {
        return NextResponse.json({ message: "No user email" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
        where: { email: userEmail },
        select: {
            testString: true,
            testStringIv: true,
            testStringSalt: true
        },
    });

    let encryptedTestString;

    if (!user?.testString) {
        const newEncrypted = await encryptString("passKey-test", passKey);
        if (!newEncrypted) {
            return NextResponse.json({ message: "Error encrypting test string" }, { status: 500 });
        }

        await prisma.user.update({
            where: { email: userEmail },
            data: {
                testString: newEncrypted.encryptContentText,
                testStringIv: newEncrypted.contentIvText,
                testStringSalt: newEncrypted.saltText,
            },
        });

        encryptedTestString = newEncrypted;
    } else {
        encryptedTestString = {
            encryptContentText: user.testString,
            contentIvText: user.testStringIv!,
            saltText: user.testStringSalt!,
        };
    }

    const decryptedTestString = await decryptString(
        encryptedTestString.encryptContentText,
        encryptedTestString.contentIvText,
        encryptedTestString.saltText,
        passKey
    );

    if (decryptedTestString === "passKey-test") {
        return NextResponse.json({ message: "PassKey correct" }, { status: 200 });
    } else {
        return NextResponse.json({ message: "PassKey incorrect" }, { status: 401 });
    }
}
