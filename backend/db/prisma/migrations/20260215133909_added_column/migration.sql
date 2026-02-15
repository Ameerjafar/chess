/*
  Warnings:

  - You are about to drop the column `roomId` on the `Game` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Game_roomId_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "roomId";
