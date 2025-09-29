import { AuthService } from "@/services/auth.service.js";
import type { LoginRequest, RegisterRequest } from "@/types/auth.types.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class AuthController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as RegisterRequest & { cpf: string };
      const authService = new AuthService(request.server, request);

      const result = await authService.register(body);

      return reply.status(201).send({
        sucesso: true,
        mensagem: "Usuário registrado com sucesso",
        dados: result,
      });
    } catch (error: any) {
      request.log.error(error);
      return reply.status(error.statusCode || 500).send({
        sucesso: false,
        erro: error.message || "Erro interno do servidor",
      });
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as LoginRequest;
      const authService = new AuthService(request.server, request);

      const result = await authService.login(body);

      return reply.status(200).send({
        sucesso: true,
        mensagem: "Login realizado com sucesso",
        dados: result,
      });
    } catch (error: any) {
      request.log.error(error);
      return reply.status(error.statusCode || 500).send({
        sucesso: false,
        erro: error.message || "Erro interno do servidor",
      });
    }
  }

  async profile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = request.user;
      const authService = new AuthService(request.server, request);

      const profile = await authService.getUserProfile(user.usuarioId);

      return reply.status(200).send({
        sucesso: true,
        dados: { usuario: profile },
      });
    } catch (error: any) {
      request.log.error(error);
      return reply.status(error.statusCode || 500).send({
        sucesso: false,
        erro: error.message || "Erro interno do servidor",
      });
    }
  }

  async refreshToken(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = request.user;
      const authService = new AuthService(request.server, request);

      const token = await request.server.jwt.sign({
        usuarioId: user.usuarioId,
        email: user.email,
      });

      return reply.status(200).send({
        sucesso: true,
        mensagem: "Token renovado com sucesso",
        dados: { token },
      });
    } catch (error: any) {
      request.log.error(error);
      return reply.status(error.statusCode || 500).send({
        sucesso: false,
        erro: error.message || "Erro interno do servidor",
      });
    }
  }
}
