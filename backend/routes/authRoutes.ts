import { Router } from 'express';
import { regsiterController, loginController } from '../controllers/authController';

export const authRoutes = Router();
authRoutes.post('/register', regsiterController);
authRoutes.post('/login', loginController); 