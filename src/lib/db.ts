import mongoose from 'mongoose';

import config from '../config';
import logger from './logger';

const clientOptions: mongoose.ConnectOptions = {
  appName: 'Adain',
  dbName: 'adain_db',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);

    logger.info('Connected to the database successfully', {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    logger.error('Error connecting to the database', error);
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();

    logger.warn('Disconnected from the database successfully', {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    logger.error('Error disconnecting from the database', error);
  }
};
