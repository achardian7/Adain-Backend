import { disconnectFromDatabase } from '../lib/db';
import logger from '../lib/logger';

const handleServerShutdown = async (): Promise<void> => {
  try {
    await disconnectFromDatabase();
    logger.info('Server Shutdown');
    process.exit(0);
  } catch (error) {
    logger.error('Error during server shutdown', error);
  }
};

export default handleServerShutdown;
