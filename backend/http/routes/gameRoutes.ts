import { Router } from 'express';
import { getAllGamesController, getGameByIdController } from '../controllers/gameControllers';

export const gameRoutes = Router();

gameRoutes.get('/allgames', getAllGamesController);
gameRoutes.get('/:gameId', getGameByIdController)
