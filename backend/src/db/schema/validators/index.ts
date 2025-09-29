import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { acessos } from "../tables/acessos.js";
import { avaliacoesFisicas } from "../tables/avaliacoes.js";
import { catracas } from "../tables/catracas.js";
import { configuracoesAcademia } from "../tables/configuracoes.js";
import { equipamentos } from "../tables/equipamentos.js";
import { manutencaoEquipamentos } from "../tables/manutencoes.js";
import { matriculas } from "../tables/matriculas.js";
import { pagamentos } from "../tables/pagamentos.js";
import { planos } from "../tables/planos.js";
import { feedbacks, treinos } from "../tables/treinos-feedbacks.js";
import { usuarios } from "../tables/usuarios.js";

export const insertUsuarioSchema = createInsertSchema(usuarios).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectUsuarioSchema = createSelectSchema(usuarios);
export const updateUsuarioSchema = insertUsuarioSchema.partial();

export const insertPlanoSchema = createInsertSchema(planos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectPlanoSchema = createSelectSchema(planos);

export const insertMatriculaSchema = createInsertSchema(matriculas).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectMatriculaSchema = createSelectSchema(matriculas);

export const insertPagamentoSchema = createInsertSchema(pagamentos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectPagamentoSchema = createSelectSchema(pagamentos);

export const insertEquipamentoSchema = createInsertSchema(equipamentos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectEquipamentoSchema = createSelectSchema(equipamentos);

export const insertManutencaoSchema = createInsertSchema(
  manutencaoEquipamentos
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectManutencaoSchema = createSelectSchema(
  manutencaoEquipamentos
);

export const insertCatracaSchema = createInsertSchema(catracas).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectCatracaSchema = createSelectSchema(catracas);

export const insertAcessoSchema = createInsertSchema(acessos).omit({
  id: true,
  createdAt: true,
});
export const selectAcessoSchema = createSelectSchema(acessos);

export const insertAvaliacaoFisicaSchema = createInsertSchema(
  avaliacoesFisicas
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectAvaliacaoFisicaSchema =
  createSelectSchema(avaliacoesFisicas);

export const insertTreinoSchema = createInsertSchema(treinos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectTreinoSchema = createSelectSchema(treinos);

export const insertFeedbackSchema = createInsertSchema(feedbacks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectFeedbackSchema = createSelectSchema(feedbacks);

export const insertConfiguracaoSchema = createInsertSchema(
  configuracoesAcademia
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectConfiguracaoSchema = createSelectSchema(
  configuracoesAcademia
);

export const validarUsuarioSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  cpf: z.string().length(14, "CPF deve ter formato xxx.xxx.xxx-xx"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido").optional(),
  senhaHash: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const validarLoginSchema = z.object({
  email: z.string().email("Email inválido"),
  senhaHash: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const validarPlanoSchema = z.object({
  nome: z.string().min(2, "Nome do plano obrigatório"),
  valor: z
    .string()
    .regex(/^\d+(\.\d{2})?$/, "Valor deve estar no formato 0.00"),
});

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
