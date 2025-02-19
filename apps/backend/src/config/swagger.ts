import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Extração de Dados",
      version: "1.0.0",
      description: "Documentação da API de Extração de Dados com Swagger",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Servidor Local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/adapters/inbound/*.ts"], // Diretório onde estão as rotas
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * Configura o Swagger na aplicação Express.
 */
export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger disponível em http://localhost:3001/api-docs");
};
