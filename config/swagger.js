// config/swagger.js

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Subscription Management API",
    version: "1.0.0",
    description:
      "API documentation for managing users, subscriptions, and workflows.",
  },
  servers: [
    {
      url: "https://subscription-management-api-0tww.onrender.com", // Your production URL
      description: "Production server",
    },
    {
      url: "http://localhost:5500", // Optional: for local dev
      description: "Local development server",
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
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
