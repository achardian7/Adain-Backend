import express from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';

import config from './config';
import docs from './docs/route';
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
app.use(helmet({ contentSecurityPolicy: false }));
app.use(limiter);

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/api', router);

docs(app);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
