import '@fastify/jwt';
import { JWTPayload } from '@/types/auth.types.js';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JWTPayload;
    user: JWTPayload;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: JWTPayload;
  }
}