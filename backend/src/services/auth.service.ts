import { usuarios } from "@/db/schema/tables/usuarios.js";
import type {
  AuthResponse,
  AuthUser,
  JWTPayload,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth.types.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyRequest } from "fastify";
import { BaseService } from "./base.service.js";

export class AuthService extends BaseService {
  constructor(app: FastifyInstance, request?: FastifyRequest) {
    super(app, request);
  }

  async register(
    data: RegisterRequest & { cpf: string }
  ): Promise<AuthResponse> {
    try {
      this.logger.info({ email: data.email }, "Tentativa de registro");

      const existingUser = await this.database
        .select()
        .from(usuarios)
        .where(eq(usuarios.email, data.email))
        .limit(1);

      if (existingUser.length > 0) {
        this.createErrorResponse("E-mail já está em uso", 409);
      }

      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(data.senha, saltRounds);

      const [newUser] = await this.database
        .insert(usuarios)
        .values({
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          senhaHash: hashedPassword,
          telefone: data.telefone,
          tipo: "cliente",
          status: "ativo",
        })
        .returning({
          id: usuarios.id,
          nome: usuarios.nome,
          email: usuarios.email,
          telefone: usuarios.telefone,
          createdAt: usuarios.createdAt,
        });

      if (!newUser) {
        this.createErrorResponse("Erro ao criar usuário", 500);
      }

      const token = await this.generateToken({
        usuarioId: newUser!.id,
        email: newUser!.email,
      });

      this.logger.info(
        { userId: newUser!.id },
        "Usuário registrado com sucesso"
      );

      return {
        usuario: {
          id: newUser!.id,
          nome: newUser!.nome,
          email: newUser!.email,
          telefone: newUser!.telefone || undefined,
          criadoEm: newUser!.createdAt,
        },
        token,
      };
    } catch (error) {
      this.handleError(error, "AuthService.register");
    }
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      this.logger.info({ email: data.email }, "Tentativa de login");

      const [user] = await this.database
        .select()
        .from(usuarios)
        .where(eq(usuarios.email, data.email))
        .limit(1);

      if (!user) {
        this.createErrorResponse("E-mail ou senha inválidos", 401);
      }

      const isPasswordValid = await bcrypt.compare(data.senha, user!.senhaHash);

      if (!isPasswordValid) {
        this.createErrorResponse("E-mail ou senha inválidos", 401);
      }

      const token = await this.generateToken({
        usuarioId: user!.id,
        email: user!.email,
      });

      this.logger.info({ userId: user!.id }, "Login realizado com sucesso");

      return {
        usuario: {
          id: user!.id,
          nome: user!.nome,
          email: user!.email,
          telefone: user!.telefone || undefined,
          criadoEm: user!.createdAt,
        },
        token,
      };
    } catch (error) {
      this.handleError(error, "AuthService.login");
    }
  }

  async getUserProfile(userId: string): Promise<AuthUser> {
    try {
      const [user] = await this.database
        .select({
          id: usuarios.id,
          nome: usuarios.nome,
          email: usuarios.email,
          telefone: usuarios.telefone,
          tipo: usuarios.tipo,
          status: usuarios.status,
        })
        .from(usuarios)
        .where(eq(usuarios.id, userId))
        .limit(1);

      if (!user) {
        this.createErrorResponse("Usuário não encontrado", 404);
      }

      return {
        id: user!.id,
        nome: user!.nome,
        email: user!.email,
        role: user!.tipo,
      };
    } catch (error) {
      this.handleError(error, "AuthService.getUserProfile");
    }
  }

  private async generateToken(
    payload: Omit<JWTPayload, "iat" | "exp">
  ): Promise<string> {
    return await this.app.jwt.sign(payload);
  }

  async verifyToken(token: string): Promise<JWTPayload> {
    try {
      return await this.app.jwt.verify<JWTPayload>(token);
    } catch (error) {
      this.createErrorResponse("Token inválido ou expirado", 401);
      throw error;
    }
  }
}
