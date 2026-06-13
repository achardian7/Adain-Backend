import app from './app';
import config from './config';
import { connectToDatabase } from './lib/db';
import logger from './lib/logger';
import handleServerShutdown from './utils/handle-server-shutdown';

const init = async (): Promise<void> => {
  try {
    await connectToDatabase();
    app.listen(config.PORT, () => {
      logger.info(`Server is running on http://localhost:${config.PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start the server', error);

    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

process.on('SIGTERM', handleServerShutdown);
process.on('SIGINT', handleServerShutdown);

init();
