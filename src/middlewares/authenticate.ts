import { RequestHandler } from 'express';

import { ApiError } from '../lib/error';
import { getUserPayload } from '../lib/jwt';
import { RequestUser } from '../types/auth';

const authenticate: RequestHandler = (req: RequestUser, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) throw new ApiError('Unauthorized', 403);

  const [prefix, accessToken] = authorization?.split(' ');

  if (!(prefix === 'Bearer' && accessToken))
    throw new ApiError('Unauthorized', 403);

  const user = getUserPayload(accessToken);

  if (!user) throw new ApiError('Unauthorized', 403);

  req.user = user;

  next();
};

export default authenticate;
