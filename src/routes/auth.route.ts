import { Router } from 'express';

import AuthController from '../controllers/auth.controller';
import authenticate from '../middlewares/authenticate';

const authRoutes = Router();

authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', AuthController.login);
authRoutes.put('/activation', AuthController.activation);
authRoutes.get('/me', authenticate, AuthController.me);

export default authRoutes;
