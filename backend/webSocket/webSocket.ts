import WebSocket, { WebSocketServer } from 'ws';
import { handleConnection } from './handlers/connectionHandler';
import { messageHandler } from './handlers/messageHandler';

const wss = new WebSocketServer({
    port: 8080
});

console.log("webSocket server successfuly connected")
wss.on('connection', (ws: WebSocket, req) => {
    console.log("connection is made in the websocket")
    handleConnection(ws, req)
    ws.on('message', (data: string) => {
        const parseData = JSON.parse(data); 
        switch (parseData.type) {
            case "MESSAGE":
                messageHandler(ws, parseData);
                break;
        }
    })
});
