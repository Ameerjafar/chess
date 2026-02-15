/*
  Warnings:

  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_adminId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "isFull" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Room";
