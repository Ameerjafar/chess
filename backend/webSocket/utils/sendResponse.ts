import { WebSocket } from "ws";

export const sendResponse = (type: string, message: string, ws: WebSocket, extraData?: object) => {
    ws.send(
        JSON.stringify({
            type,
            message,
            ...extraData
        })
    );
};
