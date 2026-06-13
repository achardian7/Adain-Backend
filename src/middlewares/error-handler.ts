import { ErrorRequestHandler } from 'express';

import { ZodError } from 'zod';

import { ApiError } from '../lib/error';
import logger from '../lib/logger';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    const zodError = new ApiError(
      'Invalid input request',
      422,
      'Validation Error',
      errors,
    );

    logger.error(zodError.message, zodError);

    return res.status(zodError.statusCode).json(zodError.serializeErrors());
  }

  if (err instanceof ApiError) {
    logger.error(err.message, err);
    return res.status(err.statusCode).json(err.serializeErrors());
  }

  const serverError = new ApiError(
    'Something went wrong, please try again later',
    500,
    'Internal Server Error',
  );

  logger.error(serverError.message, serverError);

  return res.status(serverError.statusCode).json(serverError.serializeErrors());
};

export default errorHandler;
