import { Router } from 'express';
import { createRoomController, joinRoomController } from '../controllers/roomControllers';
export const roomRoutes = Router();

roomRoutes.get('/createroom', createRoomController);
roomRoutes.get("/joinroom/:roomId", joinRoomController)
