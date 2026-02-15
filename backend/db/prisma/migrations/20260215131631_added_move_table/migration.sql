-- CreateTable
CREATE TABLE "Moves" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "moves" TEXT[],

    CONSTRAINT "Moves_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Moves" ADD CONSTRAINT "Moves_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
