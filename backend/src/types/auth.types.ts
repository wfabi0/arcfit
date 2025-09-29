export interface JWTPayload {
  usuarioId: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
}

export interface AuthResponse {
  usuario: {
    id: string;
    email: string;
    nome: string;
    telefone?: string;
    criadoEm: Date;
  };
  token: string;
}

export interface AuthUser {
  id: string;
  email: string;
  nome: string;
  role?: string;
}

