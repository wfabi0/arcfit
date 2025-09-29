import { FastifySchema } from "fastify";
import { errorResponseSchema } from "./common.schemas";

// Schema base para usuário
const usuarioSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    nome: { type: "string" },
    email: { type: "string", format: "email" },
    telefone: { type: "string", nullable: true },
    tipo: { type: "string", enum: ["admin", "funcionario", "cliente"] },
    status: { type: "string", enum: ["ativo", "inativo"] },
    createdAt: { type: "string", format: "date-time" },
  },
};

const authSuccessResponse = {
  type: "object",
  properties: {
    sucesso: { type: "boolean", default: true },
    mensagem: { type: "string" },
    dados: {
      type: "object",
      properties: {
        usuario: usuarioSchema,
        token: { type: "string" },
      },
      required: ["usuario", "token"],
    },
  },
  required: ["sucesso"],
};

export const registrarSchema: FastifySchema = {
  tags: ["Auth"],
  summary: "Cadastrar novo usuário",
  description: "Cria uma nova conta de usuário no sistema",
  body: {
    type: "object",
    properties: {
      nome: { type: "string", minLength: 2, maxLength: 255 },
      cpf: { type: "string", pattern: "^[0-9]{11}$" },
      email: { type: "string", format: "email" },
      senha: { type: "string", minLength: 6 },
      telefone: { type: "string", nullable: true },
    },
    required: ["nome", "cpf", "email", "senha"],
    additionalProperties: false,
  },
  response: {
    201: authSuccessResponse,
    400: errorResponseSchema,
    409: errorResponseSchema,
  },
};

export const loginSchema: FastifySchema = {
  tags: ["Auth"],
  summary: "Fazer login",
  description: "Autentica um usuário e retorna token JWT",
  body: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      senha: { type: "string", minLength: 6 },
    },
    required: ["email", "senha"],
    additionalProperties: false,
  },
  response: {
    200: authSuccessResponse,
    401: errorResponseSchema,
  },
};

export const perfilSchema: FastifySchema = {
  tags: ["Auth"],
  summary: "Obter perfil do usuário",
  description: "Retorna informações do usuário autenticado",
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
            usuario: usuarioSchema,
          },
          required: ["usuario"],
        },
      },
      required: ["sucesso"],
    },
    401: errorResponseSchema,
  },
};
