import { Router } from 'express';
import { regsiterController, loginController } from '../controllers/authControllers';

export const authRoutes = Router();
authRoutes.post('/register', regsiterController);
authRoutes.post('/login', loginController);
