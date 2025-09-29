import { AuthController } from "@/controllers/auth.controller.js";
import { authenticate } from "@/middlewares/auth.middleware.js";
import {
  loginSchema,
  perfilSchema,
  registrarSchema,
} from "@/schemas/auth.schemas.js";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function authRoutes(
  app: FastifyInstance,
  options: FastifyPluginOptions
) {
  const authController = new AuthController();

  app.post("/register", {
    schema: registrarSchema,
    handler: authController.register,
  });

  app.post("/login", {
    schema: loginSchema,
    handler: authController.login,
  });

  app.get("/profile", {
    schema: perfilSchema,
    preHandler: [authenticate],
    handler: authController.profile,
  });

  app.post("/refresh", {
    schema: {
      tags: ["Auth"],
      summary: "Renovar token JWT",
      description: "Renova o token JWT do usuário autenticado",
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          type: "object",
          properties: {
            sucesso: { type: "boolean", default: true },
            mensagem: { type: "string" },
            dados: {
              type: "object",
              properties: {
                token: { type: "string" },
              },
              required: ["token"],
            },
          },
          required: ["sucesso"],
        },
        401: {
          type: "object",
          properties: {
            sucesso: { type: "boolean", default: false },
            erro: { type: "string" },
            mensagem: { type: "string" },
          },
          required: ["sucesso", "erro"],
        },
        500: {
          type: "object",
          properties: {
            sucesso: { type: "boolean", default: false },
            erro: { type: "string" },
            mensagem: { type: "string" },
          },
          required: ["sucesso", "erro"],
        },
      },
    },
    preHandler: [authenticate],
    handler: authController.refreshToken,
  });
}
