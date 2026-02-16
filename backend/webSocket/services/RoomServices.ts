import { WebSocket } from "ws";

class RoomService {
    private rooms = new Map<string, Set<WebSocket>>();

    createRoom(ws: WebSocket, roomId: string): boolean {
        if (this.rooms.has(roomId)) {
            return false;
        }

        this.rooms.set(roomId, new Set([ws]));
        return true;
    }

    joinRoom(ws: WebSocket, roomId: string): boolean {
        const room = this.rooms.get(roomId);

        if (!room || room.size >= 2) {
            return false;
        }

        room.add(ws);
        return true;
    }

    removePlayer(ws: WebSocket, roomId: string): boolean {
        const room = this.rooms.get(roomId);

        if (!room) {
            return false;
        }

        room.delete(ws);

        if (room.size === 0) {
            this.rooms.delete(roomId);
        }

        return true;
    }

    getRoom(roomId: string): Set<WebSocket> | undefined {
        return this.rooms.get(roomId);
    }

    hasRoom(roomId: string): boolean {
        return this.rooms.has(roomId);
    }
}

export const roomService = new RoomService();
