import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    swaggerDefinition: {
      openapi: "3.0.3",
      info: {
        title: 'API Tresga v1',
        description: `La API Tresga proporciona servicios para gestionar carpetas y documentos. Permite la creación, actualización, eliminación y consulta de carpetas, así como otras operaciones relacionadas. \n\n[Ver documentación JSON](http://localhost:${process.env.PORT || 3000}/api-docs.json) \n\n**Contacto:**\n- Email: [julio.villagrana.sanghelios2@gmail.com](mailto:julio.villagrana.sanghelios2@gmail.com)\n- GitHub: [SangheliosBlack](https://github.com/SangheliosBlack)`,
        version: "BETA",
        externalDocs: {
          description: "Ver documentación oficial",
          url: `https://documentation.bloomreach.com/content/openapi/62c43f1efb87af00768942ad`
        },
        contact: "email: apiteam@swagger.io"
      },
      
      host: `localhost:${process.env.PORT || 3000}`,
      basePath: `/api/${process.env.API_VERSION}`,
      produces: ['application/json'],
      schemes: ['http', 'https'],
      servers: [
        {
          "url": `http://localhost:${process.env.PORT || 3000}`,
          "description": "Local Server"
        },
      ],
      externalDocs: {
        "description": "See official Bloomreach documentation",
        "url": "https://documentation.bloomreach.com/content/reference/folder-management-api"
      },
      components: {
        "securitySchemes": {
          "bearerAuth": {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization",
            "description": "JWT Authorization header: Enter the token with the `Bearer ` prefix, e.g. \"Bearer abcde12345\"."
          }
        }
      },
      security: [
        {
          "bearerAuth": []
        }
      ],
    },
    basedir: __dirname,
    apis: ['./routes2/**/*.js'], 
};
  
export default options