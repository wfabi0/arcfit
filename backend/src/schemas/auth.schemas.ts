import { validarUsuarioSchema } from "@/db/schema";
import { validarLoginSchema } from "@/db/schema/validators";
import { FastifySchema } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";

export const registrarSchema: FastifySchema = {
  tags: ["Auth"],
  summary: "Cadastrar novo usuário",
  description: "Cria uma nova conta de usuário no sistema",
  body: zodToJsonSchema(validarUsuarioSchema),
  response: {
    201: {
      type: "object",
      properties: {
        sucesso: { type: "boolean" },
        mensagem: { type: "string" },
        dados: {
          type: "object",
          properties: {
            usuario: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                nome: { type: "string" },
                telefone: { type: "string" },
                criadoEm: { type: "string" },
              },
            },
            token: { type: "string" },
          },
        },
      },
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
  body: zodToJsonSchema(validarLoginSchema),
  response: {
    200: {
      type: "object",
      properties: {
        sucesso: { type: "boolean" },
        mensagem: { type: "string" },
        dados: {
          type: "object",
          properties: {
            usuario: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                nome: { type: "string" },
              },
            },
            token: { type: "string" },
          },
        },
      },
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
      type: "object",
      properties: {
        sucesso: { type: "boolean" },
        dados: {
          type: "object",
          properties: {
            usuario: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                nome: { type: "string" },
                telefone: { type: "string" },
                criadoEm: { type: "string" },
              },
            },
          },
        },
      },
    },
    401: {
      $ref: "#/components/schemas/ErrorResponse",
    },
  },
};
