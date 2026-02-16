import { WebSocket } from "ws";
import { roomService } from "../services/RoomServices";
import { sendResponse } from "../utils/sendResponse";
import { DatabaseError } from "pg";
export const messageHandler = (ws: WebSocket, data: any) => {
    const roomId = data.roomId;
    if (!roomService.hasRoom(roomId)) {
        return sendResponse("ROOM_NOT_FOUND", "room does not exists", ws);
    }
    const getRoom = roomService.getRoom(roomId);
    if (!getRoom) {
        return sendResponse("NO_DATA", "no data available in this room", ws)
    }
    getRoom.forEach((member: WebSocket) => {
        if (member != ws && member.readyState === WebSocket.OPEN) {
            sendResponse("MESSAGE", data.message, member);
        }
    })
}