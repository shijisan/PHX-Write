import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

// Helper function to generate a random string
const generateRandomString = (length: number): string => {
  return crypto.randomBytes(length).toString("hex");
};

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  // Validate input
  if (!email || !username || !password) {
    return NextResponse.json(
      { error: "Email, username, and password are required" },
      { status: 400 }
    );
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Generate a salt and hash the password
    const salt = generateRandomString(16);
    const hashedPassword = crypto
      .scryptSync(password, salt, 64)
      .toString("hex");

    // Generate and hash the encryptedKey
    const encryptedKey = generateRandomString(32);
    const hashedEncryptedKey = crypto
      .scryptSync(encryptedKey, salt, 64)
      .toString("hex");

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        salt,
        encryptedKey: hashedEncryptedKey,
      },
    });

    // Return basic user info
    return NextResponse.json(
      { id: newUser.id, email: newUser.email, username: newUser.username },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
