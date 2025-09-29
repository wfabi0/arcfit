import { FastifyReply, FastifyRequest } from "fastify";
import { BaseService } from "./base.service.js";

export class ExampleService extends BaseService {
  async getAllUsers() {
    try {
      this.logger.info("Buscando todos os usuários");

      const users = await this.database.query.usuarios.findMany({
        columns: {
          id: true,
          nome: true,
          email: true,
          status: true,
        },
      });

      return this.createResponse(users, "Usuários recuperados com sucesso");
    } catch (error) {
      this.handleError(error, "ExampleService.getAllUsers");
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.database.query.usuarios.findFirst({
        where: (users, { eq }) => eq(users.id, id),
        columns: {
          senhaHash: false,
        },
      });

      if (!user) {
        this.createErrorResponse("Usuário não encontrado", 404);
      }

      return this.createResponse(user);
    } catch (error) {
      this.handleError(error, "ExampleService.getUserById");
    }
  }
}

export class ExampleController {
  async getUsers(request: FastifyRequest, reply: FastifyReply) {
    const service = new ExampleService(request.server, request);
    const result = await service.getAllUsers();

    return reply.status(200).send(result);
  }
}
