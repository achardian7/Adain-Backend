import { RequestHandler } from 'express';

import { ApiError } from '../lib/error';

const notFoundHandler: RequestHandler = (req, _res, next) => {
  const error = new ApiError(`${req.method} ${req.path} is not found`, 404);

  next(error);
};

export default notFoundHandler;
