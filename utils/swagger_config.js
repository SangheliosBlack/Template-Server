module.exports.options = {
    swaggerDefinition: {
      info: {
        description: 'Tramita tu VISA Online backend API',
        title: 'Backend API',
        version: '1.0.0',
      },
      host: `localhost:${process.env.PORT || 3000}`,
      basePath: `/api/${process.env.API_VERSION}`,
      produces: ['application/json', 'application/xml'],
      schemes: ['http', 'https'],
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description:
            'JWT Authorization header: Enter the token with the `Bearer ` prefix, e.g. "Bearer abcde12345".',
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    basedir: __dirname, // app absolute path
    files: ['./routes/**/*.js'], // Path to the API handle folder
  };