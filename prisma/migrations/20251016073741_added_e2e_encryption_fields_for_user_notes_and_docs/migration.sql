-- CreateEnum
CREATE TYPE "NoteType" AS ENUM ('wysiwyg', 'markdown');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passKey" TEXT,
ADD COLUMN     "salt" TEXT;

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "type" "NoteType" NOT NULL DEFAULT 'wysiwyg',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
