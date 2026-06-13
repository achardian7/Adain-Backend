import swaggerAutogen from 'swagger-autogen';

import config from '../config';

const outputFile = './swagger_output.json';
const endpointsFiles = ['../routes/index.ts'];

const doc = {
  info: {
    version: 'v0.0.1',
    title: 'Adain API Documentation',
    description: '',
  },
  servers: [
    {
      url: `http://localhost:${config.PORT}/api`,
      description: 'Local server',
    },
    {
      url: `https://adain-backend.vercel.app/api`,
      description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },

    schemas: {
      LoginRequest: {
        identifier: 'tonystark',
        password: '123123123',
      },

      RegisterRequest: {
        name: 'Tony Stark',
        email: 'example@mail.com',
        username: 'tonystark',
        password: '123123123',
        confirmPassword: '123123123',
      },
    },
  },
};

swaggerAutogen({
  openapi: '3.0.0',
})(outputFile, endpointsFiles, doc);
