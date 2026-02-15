import type { Request, Response } from "express";
import { prisma } from '../db/lib'
export const getAllGamesController = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const games = await prisma.game.findMany({
      where: {
        OR: [
          { player1Id: userId },
          { player2Id: userId },
        ],
      },
    });

    return res.status(200).json({ success: true, data: games, error: null });
  } catch (error: unknown) {
    console.error("Get All Games Error:", error);
    return res.status(500).json({ success: false, data: null, error: "SERVER_ERROR" });
  }
};

export const getGameByIdController = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { roomId } = req.params;

  try {
    if (!roomId) {
      return res.status(400).json({ success: false, data: null, error: "INVALID_REQUEST" });
    }

    const game = await prisma.game.findUnique({
      where: { id: roomId as string },
      include: { player1: true, player2: true, winner: true },
    });

    if (!game) {
      return res.status(404).json({ success: false, data: null, error: "GAME_NOT_FOUND" });
    }

    if (game.player1Id !== userId && game.player2Id !== userId) {
      return res.status(403).json({ success: false, data: null, error: "FORBIDDEN" });
    }

    return res.status(200).json({ success: true, data: game, error: null });
  } catch (error: unknown) {
    console.error("Get Game By ID Error:", error);
    return res.status(500).json({ success: false, data: null, error: "SERVER_ERROR" });
  }
};
