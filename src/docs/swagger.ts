import swaggerAutogen from 'swagger-autogen';

import config from '../config';

const outputFile = './swagger_output.json';
const endpointsFiles = ['../routes/index.ts'];

const doc = {
  info: {
    version: 'v0.0.1',
    title: 'Adain API Documentation',
    description:
      'ADAIN API is a comprehensive, production-ready Event Ticket Management API built to deliver a smooth and secure ticket-purchasing experience. Whether you are managing intimate workshops or large-scale festivals, ADAIN provides the backend infrastructure needed to handle high-volume ticket transactions with precision.',
  },
  servers: [
    {
      url: `http://localhost:${config.PORT}/api`,
      description: 'Local server',
    },
    {
      url: `https://adain-backend.vercel.app/api`,
      description: 'Production server',
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
        fullName: 'Tony Stark',
        email: 'example@mail.com',
        username: 'tonystark',
        password: '123123123',
        confirmPassword: '123123123',
      },

      ActivationRequest: {
        code: '24b3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx12',
      },
    },
  },
};

swaggerAutogen({
  openapi: '3.0.0',
})(outputFile, endpointsFiles, doc);
