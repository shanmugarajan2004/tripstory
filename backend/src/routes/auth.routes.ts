import { Router } from 'express';
import { body } from 'express-validator';
import { signup, login, googleLogin, getProfile, updateProfile, changePassword } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

export const authRouter = Router();

authRouter.post('/signup',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  signup
);

authRouter.post('/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
  ],
  login
);

authRouter.post('/google', googleLogin);

authRouter.get('/profile', authenticate, getProfile);
authRouter.put('/profile', authenticate, updateProfile);
authRouter.put('/password', authenticate, changePassword);
