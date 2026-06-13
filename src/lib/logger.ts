import winston from 'winston';

import config from '../config';

const { combine, colorize, printf, timestamp, errors, json } = winston.format;

const transports: winston.transport[] = [];

if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        errors({ stack: true }),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
        colorize({ all: true }),
        printf(({ level, message, timestamp, stack, ...meta }) => {
          const logMessage = stack || message;

          const cleanMeta = { ...meta };
          delete cleanMeta[Symbol.for('message') as any];
          delete cleanMeta[Symbol.for('level') as any];
          delete cleanMeta[Symbol.for('splat') as any];

          const metaStr = Object.keys(cleanMeta).length
            ? `\n${JSON.stringify(cleanMeta, null, 2)}`
            : '';

          return `${timestamp} [${level}]: ${logMessage}${metaStr}`;
        }),
      ),
    }),
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: combine(timestamp(), errors({ stack: true }), json()),
    }),
  );
}

const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports,
  silent: config.NODE_ENV === 'test',
});

export default logger;
