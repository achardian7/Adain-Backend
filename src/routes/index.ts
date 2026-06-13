import { Router } from 'express';

import authRoutes from './auth.route';

const router = Router();

router.get('/', (_req, res, _next) => {
  res.json({
    message: 'API is live',
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);

export default router;
