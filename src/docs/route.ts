import { Express } from 'express';

import swaggerUi from 'swagger-ui-express';

import swaggerOutput from './swagger_output.json';

const docs = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
};

export default docs;
