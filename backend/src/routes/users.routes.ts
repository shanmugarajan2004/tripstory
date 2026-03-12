import { Router } from 'express';
import { getUserByUsername, followUser, getStats } from '../controllers/users.controller';
import { authenticate } from '../middleware/auth.middleware';

export const usersRouter = Router();

usersRouter.get('/stats', authenticate, getStats);
usersRouter.get('/:username', getUserByUsername);
usersRouter.post('/:id/follow', authenticate, followUser);
