import { sendResponse } from "../utils/sendResponse";
import { roomService } from "../services/RoomServices";
import { WebSocket } from "ws";

export const handleConnection = (ws: WebSocket, req: any) => {
    const url = new URL(req.url!, "http://localhost");
    const roomId = url.searchParams.get("roomId");
    const joinRoom = url.searchParams.get("joinRoom");

    if (!roomId) {
        sendResponse("ROOM_ID_REQUIRED", "Room ID is required", ws);
        return;
    }
    if (joinRoom === "false") {
        const created = roomService.createRoom(ws, roomId);

        if (!created) {
            sendResponse("ROOM_ALREADY_EXISTS", "Room already exists", ws);
            return;
        }

        sendResponse("ROOM_CREATED", "Room created successfully", ws, {
            roomId,
            players: 1
        });

        return;
    }
    if (joinRoom === "true") {
        const joined = roomService.joinRoom(ws, roomId);

        if (!joined) {
            sendResponse("ROOM_FULL_OR_NOT_FOUND", "Room full or does not exist", ws);
            return;
        }

        const room = roomService.getRoom(roomId);

        sendResponse("ROOM_JOINED", "Successfully joined the room", ws, {
            roomId,
            players: room?.size
        });

        return;
    }

    sendResponse("INVALID_ROOM_REQUEST", "Invalid room request", ws);
};
