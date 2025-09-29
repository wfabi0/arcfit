import { FastifyRequest, FastifyReply } from 'fastify';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.status(401).send({
      sucesso: false,
      erro: 'Token de acesso inválido ou expirado',
    });
  }
}

export async function optionalAuthenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    // Não bloqueia a requisição, apenas não adiciona o usuário
    request.log.debug('Token opcional não fornecido ou inválido');
  }
}

export function requireRole(roles: string[]) {
  return async function(request: FastifyRequest, reply: FastifyReply) {
    if (!request.user) {
      return reply.status(401).send({
        sucesso: false,
        erro: 'Acesso negado - token necessário',
      });
    }

    const userRole = request.user.role || 'cliente';
    
    if (!roles.includes(userRole)) {
      return reply.status(403).send({
        sucesso: false,
        erro: 'Acesso negado - permissão insuficiente',
      });
    }
  };
}