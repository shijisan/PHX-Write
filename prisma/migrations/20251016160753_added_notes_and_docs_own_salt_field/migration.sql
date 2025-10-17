/*
  Warnings:

  - Added the required column `salt` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "salt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "salt" TEXT NOT NULL;
