import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { AuthController } from '@/controllers/auth.controller.js';
import { authenticate } from '@/middlewares/auth.middleware.js';
import { registrarSchema, loginSchema, perfilSchema } from '@/schemas/auth.schemas.js';

export default async function authRoutes(app: FastifyInstance, options: FastifyPluginOptions) {
  const authController = new AuthController();

  // Registrar usuário
  app.post('/register', {
    schema: registrarSchema,
    handler: authController.register,
  });

  // Login
  app.post('/login', {
    schema: loginSchema,
    handler: authController.login,
  });

  // Perfil do usuário (protegido)
  app.get('/profile', {
    schema: perfilSchema,
    preHandler: [authenticate],
    handler: authController.profile,
  });

  // Refresh token (protegido)
  app.post('/refresh', {
    schema: {
      tags: ['Auth'],
      summary: 'Renovar token JWT',
      description: 'Renova o token JWT do usuário autenticado',
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          type: 'object',
          properties: {
            sucesso: { type: 'boolean' },
            mensagem: { type: 'string' },
            dados: {
              type: 'object',
              properties: {
                token: { type: 'string' },
              },
            },
          },
        },
        401: {
          $ref: '#/components/schemas/ErrorResponse',
        },
      },
    },
    preHandler: [authenticate],
    handler: authController.refreshToken,
  });
}