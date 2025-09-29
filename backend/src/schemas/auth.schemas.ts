import { FastifySchema } from "fastify";

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
    201: {
      $ref: "#/components/schemas/SuccessResponse",
    },
    400: {
      $ref: "#/components/schemas/ErrorResponse",
    },
    409: {
      $ref: "#/components/schemas/ErrorResponse",
    },
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
    200: {
      $ref: "#/components/schemas/SuccessResponse",
    },
    401: {
      $ref: "#/components/schemas/ErrorResponse",
    },
  },
};

export const perfilSchema: FastifySchema = {
  tags: ["Auth"],
  summary: "Obter perfil do usuário",
  description: "Retorna informações do usuário autenticado",
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      $ref: "#/components/schemas/SuccessResponse",
    },
    401: {
      $ref: "#/components/schemas/ErrorResponse",
    },
  },
};
