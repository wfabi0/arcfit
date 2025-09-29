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
            sucesso: { type: "boolean" },
            mensagem: { type: "string" },
            dados: {
              type: "object",
              properties: {
                token: { type: "string" },
              },
            },
          },
        },
        401: {
          $ref: "#/components/schemas/ErrorResponse",
        },
      },
    },
    preHandler: [authenticate],
    handler: authController.refreshToken,
  });
}
