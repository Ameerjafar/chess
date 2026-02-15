/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "roomId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_roomId_key" ON "Game"("roomId");
