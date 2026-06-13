import { Express } from 'express';

import swaggerUi from 'swagger-ui-express';

import swaggerOutput from './swagger_output.json';

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css';
const JS_URLS = [
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui-bundle.js',
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui-standalone-preset.js',
];

const docs = (app: Express) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerOutput, {
      customCssUrl: CSS_URL,
      customJs: JS_URLS,
    }),
  );
};

export default docs;
