import type { Request, Response } from 'express';
import { prisma } from '../../db/lib';
import { redis } from '../../db/cache';

export const createRoomController = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { time, roomId } = req.body;

    try {
        if (!time || !roomId) {
            return res.status(400).json({ success: false, data: null, error: "INVALID_REQUEST" });
        }

        const roomData = {
            time,
            player1Id: userId,
            isFull: false,
        };

        await redis.set(roomId, JSON.stringify(roomData), "EX", 3600);

        const game = await prisma.game.create({
            data: {
                player1Id: userId,
                gameStatus: "WAITING",
                time,
            },
        });

        return res.status(200).json({ success: true, data: game, error: null });
    } catch (error: unknown) {
        console.error("Create Game Error:", error);
        return res.status(500).json({ success: false, data: null, error: "SERVER_ERROR" });
    }
};

export const joinRoomController = async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const userId = req.userId;

    try {
        if (!roomId) {
            return res.status(400).json({ success: false, data: null, error: "INVALID_REQUEST" });
        }

        const room = await redis.get(roomId as string);

        if (!room) {
            return res.status(404).json({ success: false, data: null, error: "ROOM_NOT_FOUND" });
        }

        const roomData = JSON.parse(room);

        if (roomData.isFull) {
            return res.status(403).json({ success: false, data: null, error: "ROOM_ALREADY_FULL" });
        }

        if (roomData.player1Id === userId) {
            return res.status(400).json({ success: false, data: null, error: "CANNOT_JOIN_YOUR_OWN_ROOM" });
        }

        roomData.player2Id = userId;
        roomData.isFull = true;

        await redis.set(roomId as string, JSON.stringify(roomData), "EX", 3600);

        await prisma.game.update({
            where: { id: roomId as string },
            data: { player2Id: userId, gameStatus: "ACTIVE" },
        });

        return res.status(200).json({ success: true, data: "Successfully joined the room", error: null });
    } catch (error: unknown) {
        console.error("Join Game Error:", error);
        return res.status(500).json({ success: false, data: null, error: "SERVER_ERROR" });
    }
};
