import { Router } from 'express';
import { authRoutes } from './authRoutes';
import { roomRoutes } from './roomRoutes';
import { verifyToken } from '../middlewares/authMiddleware';
import { gameRoutes } from './gameRoutes';

export const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/room', verifyToken, roomRoutes);
routes.use('/game', verifyToken,gameRoutes)