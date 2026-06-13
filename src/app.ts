import express from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';

import config from './config';
import logger from './lib/logger';
import limiter from './lib/rate-limiter';
import errorHandler from './middlewares/error-handler';
import notFoundHandler from './middlewares/not-found-handler';
import router from './routes';

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (
      !requestOrigin ||
      config.NODE_ENV === 'development' ||
      config.WHITELIST.includes(requestOrigin)
    ) {
      callback(null, true);
    } else {
      callback(new Error(`CORS error: ${requestOrigin} is not allowed`), false);

      logger.error(`CORS error: ${requestOrigin} is not allowed`);
    }
  },
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  compression({
    threshold: 1024,
  }),
);
app.use(helmet());
app.use(limiter);

app.use('/api', router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
