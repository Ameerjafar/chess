import WebSocket, { WebSocketServer } from 'ws';
import { handleConnection } from './handlers/connectionHandler';
const wss = new WebSocketServer({
    port: parseInt(process.env.WEBSOCKET_SERVER!)
});

const roomSocket = new Map<string, Set<WebSocket>>();

wss.on('connection', (ws: WebSocket, req) => {
    handleConnection(ws, req)
});
