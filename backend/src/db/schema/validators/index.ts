import { z } from "zod";
import { usuarios } from "../tables/usuarios.js";
import { planos } from "../tables/planos.js";
import { matriculas } from "../tables/matriculas.js";
import { pagamentos } from "../tables/pagamentos.js";
import { equipamentos } from "../tables/equipamentos.js";
import { manutencaoEquipamentos } from "../tables/manutencoes.js";
import { catracas } from "../tables/catracas.js";
import { acessos } from "../tables/acessos.js";
import { avaliacoesFisicas } from "../tables/avaliacoes.js";
import { treinos, feedbacks } from "../tables/treinos-feedbacks.js";
import { configuracoesAcademia } from "../tables/configuracoes.js";

// Schemas básicos de validação
export const validarUsuarioSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido").optional().nullable(),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const validarLoginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const validarPlanoSchema = z.object({
  nome: z.string().min(2, "Nome do plano obrigatório"),
  valor: z.string().regex(/^\d+(\.\d{2})?$/, "Valor deve estar no formato 0.00"),
});

// Tipos inferenciais das tabelas
export type Usuario = typeof usuarios.$inferSelect;
export type NovoUsuario = typeof usuarios.$inferInsert;

export type Plano = typeof planos.$inferSelect;
export type NovoPlano = typeof planos.$inferInsert;

export type Matricula = typeof matriculas.$inferSelect;
export type NovaMatricula = typeof matriculas.$inferInsert;

export type Pagamento = typeof pagamentos.$inferSelect;
export type NovoPagamento = typeof pagamentos.$inferInsert;

export type Equipamento = typeof equipamentos.$inferSelect;
export type NovoEquipamento = typeof equipamentos.$inferInsert;

export type Manutencao = typeof manutencaoEquipamentos.$inferSelect;
export type NovaManutencao = typeof manutencaoEquipamentos.$inferInsert;

export type Catraca = typeof catracas.$inferSelect;
export type NovaCatraca = typeof catracas.$inferInsert;

export type Acesso = typeof acessos.$inferSelect;
export type NovoAcesso = typeof acessos.$inferInsert;

export type AvaliacaoFisica = typeof avaliacoesFisicas.$inferSelect;
export type NovaAvaliacaoFisica = typeof avaliacoesFisicas.$inferInsert;

export type Treino = typeof treinos.$inferSelect;
export type NovoTreino = typeof treinos.$inferInsert;

export type Feedback = typeof feedbacks.$inferSelect;
export type NovoFeedback = typeof feedbacks.$inferInsert;

export type Configuracao = typeof configuracoesAcademia.$inferSelect;
export type NovaConfiguracao = typeof configuracoesAcademia.$inferInsert;
