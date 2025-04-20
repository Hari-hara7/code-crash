/*
  Warnings:

  - You are about to drop the `TipVote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TipVote" DROP CONSTRAINT "TipVote_tipId_fkey";

-- DropForeignKey
ALTER TABLE "TipVote" DROP CONSTRAINT "TipVote_userId_fkey";

-- DropTable
DROP TABLE "TipVote";
