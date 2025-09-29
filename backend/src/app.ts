import { env } from "@/config/env.js";
import Fastify, { FastifyInstance } from "fastify";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: env.LOG_LEVEL,
      transport:
        env.NODE_ENV === "development"
          ? {
              target: "pino-pretty",
              options: {
                colorize: true,
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
              },
            }
          : undefined,
    },
  });

  // Security
  await app.register(import("@fastify/helmet"), {
    contentSecurityPolicy: false,
  });

  // CORS
  await app.register(import("@fastify/cors"), {
    origin: [env.FRONTEND_URL],
    credentials: true,
  });

  // Rate Limiting
  await app.register(import("@fastify/rate-limit"), {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_TIME_WINDOW,
  });

  // JWT
  await app.register(import("@fastify/jwt"), {
    secret: env.JWT_SECRET,
    sign: {
      expiresIn: env.JWT_EXPIRES_IN,
    },
  });

  // OpenAPI Documentation with Swagger
  await app.register(import("@fastify/swagger"), {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "ArcFit API",
        description:
          "🏋️‍♂️ API completa para gestão de academia com recursos modernos",
        version: "1.0.0",
        contact: {
          name: "ArcFit Team",
          email: "dev@arcfit.com",
        },
        license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT",
        },
      },
      servers: [
        {
          url: `http://${env.HOST}:${env.PORT}`,
          description: "Servidor de Desenvolvimento",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "Token JWT para autenticação",
          },
        },
      },
      tags: [
        { name: "Auth", description: "Endpoints de autenticação" },
        { name: "Members", description: "Gestão de membros" },
        { name: "Plans", description: "Planos de academia" },
        { name: "Payments", description: "Pagamentos e cobranças" },
        { name: "Health", description: "Status da aplicação" },
      ],
    },
  });

  // Scalar API Reference Documentation
  await app.register(import("@scalar/fastify-api-reference"), {
    routePrefix: "/docs",
    configuration: {
      url: "/docs.json",
      theme: "default",
    },
  });

  // JSON spec endpoint
  app.get("/docs.json", async () => {
    return app.swagger();
  });

  // Health check
  app.get(
    "/health",
    {
      schema: {
        tags: ["Health"],
        description: "Health check endpoint",
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string" },
              timestamp: { type: "string" },
              uptime: { type: "number" },
            },
          },
        },
      },
    },
    async () => {
      return {
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      };
    }
  );

  // API Routes
  // await app.register(import('@/routes/auth.js'), { prefix: '/api/auth' });
  // await app.register(import('@/routes/members.js'), { prefix: '/api/members' });
  // await app.register(import('@/routes/plans.js'), { prefix: '/api/plans' });
  // await app.register(import('@/routes/payments.js'), { prefix: '/api/payments' });

  // Global error handler
  app.setErrorHandler(async (error, request, reply) => {
    app.log.error(error);

    // Validation errors
    if (error.validation) {
      return reply.status(400).send({
        success: false,
        error: "Validation Error",
        message: "Dados inválidos fornecidos",
        details: error.validation,
      });
    }

    // JWT errors
    if (error.message.includes("jwt")) {
      return reply.status(401).send({
        success: false,
        error: "Authentication Error",
        message: "Token inválido ou expirado",
      });
    }

    // Database errors
    if (error.message.includes("unique constraint")) {
      return reply.status(409).send({
        success: false,
        error: "Conflict Error",
        message: "Recurso já existe",
      });
    }

    // Rate limit errors
    if (error.statusCode === 429) {
      return reply.status(429).send({
        success: false,
        error: "Too Many Requests",
        message: "Muitas tentativas. Tente novamente mais tarde",
      });
    }

    // Default error response
    const statusCode = error.statusCode || 500;
    reply.status(statusCode).send({
      success: false,
      error: error.name || "Internal Server Error",
      message: statusCode === 500 ? "Erro interno do servidor" : error.message,
    });
  });

  return app;
}
