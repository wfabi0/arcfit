import { db } from "@/db/connection.js";
import { FastifyInstance, FastifyRequest } from "fastify";

export abstract class BaseService {
  constructor(
    protected app: FastifyInstance,
    protected request?: FastifyRequest
  ) {}

  protected get database() {
    return db;
  }

  protected get logger() {
    return this.request?.log || this.app.log;
  }

  protected handleError(error: unknown, context: string): never {
    this.logger.error({ error, context }, `Erro em ${context}`);

    if (error instanceof Error) {
      if (error.message.includes("duplicate key")) {
        const conflictError = new Error("Recurso já existe");
        (conflictError as any).statusCode = 409;
        throw conflictError;
      }

      if (error.message.includes("not found")) {
        const notFoundError = new Error("Recurso não encontrado");
        (notFoundError as any).statusCode = 404;
        throw notFoundError;
      }

      throw error;
    }

    const unexpectedError = new Error(`Erro inesperado em ${context}`);
    (unexpectedError as any).statusCode = 500;
    throw unexpectedError;
  }

  protected createResponse<T>(data: T, message?: string) {
    return {
      sucesso: true,
      mensagem: message,
      dados: data,
    };
  }

  protected createErrorResponse(message: string, statusCode: number = 500) {
    const error = new Error(message);
    (error as any).statusCode = statusCode;
    throw error;
  }
}
