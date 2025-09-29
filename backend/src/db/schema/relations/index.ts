import { relations } from "drizzle-orm";
import { acessos } from "../tables/acessos.js";
import { avaliacoesFisicas } from "../tables/avaliacoes.js";
import { catracas } from "../tables/catracas.js";
import { equipamentos } from "../tables/equipamentos.js";
import { manutencaoEquipamentos } from "../tables/manutencoes.js";
import { matriculas } from "../tables/matriculas.js";
import { pagamentos } from "../tables/pagamentos.js";
import { planos } from "../tables/planos.js";
import { feedbacks, treinos } from "../tables/treinos-feedbacks.js";
import { usuarios } from "../tables/usuarios.js";

export const usuariosRelations = relations(usuarios, ({ many }) => ({
  matriculas: many(matriculas),
  acessos: many(acessos),
  avaliacoesFisicas: many(avaliacoesFisicas),
  avaliacoesRealizadas: many(avaliacoesFisicas, { relationName: "instrutor" }),
  treinosCliente: many(treinos),
  treinosInstrutor: many(treinos, { relationName: "instrutor" }),
  feedbacks: many(feedbacks),
}));

export const planosRelations = relations(planos, ({ many }) => ({
  matriculas: many(matriculas),
}));

export const matriculasRelations = relations(matriculas, ({ one, many }) => ({
  usuario: one(usuarios, {
    fields: [matriculas.usuarioId],
    references: [usuarios.id],
  }),
  plano: one(planos, {
    fields: [matriculas.planoId],
    references: [planos.id],
  }),
  pagamentos: many(pagamentos),
}));

export const pagamentosRelations = relations(pagamentos, ({ one }) => ({
  matricula: one(matriculas, {
    fields: [pagamentos.matriculaId],
    references: [matriculas.id],
  }),
}));

export const equipamentosRelations = relations(equipamentos, ({ many }) => ({
  manutencoes: many(manutencaoEquipamentos),
}));

export const manutencaoEquipamentosRelations = relations(
  manutencaoEquipamentos,
  ({ one }) => ({
    equipamento: one(equipamentos, {
      fields: [manutencaoEquipamentos.equipamentoId],
      references: [equipamentos.id],
    }),
  })
);

export const catracasRelations = relations(catracas, ({ many }) => ({
  acessos: many(acessos),
}));

export const acessosRelations = relations(acessos, ({ one }) => ({
  usuario: one(usuarios, {
    fields: [acessos.usuarioId],
    references: [usuarios.id],
  }),
  catraca: one(catracas, {
    fields: [acessos.catracaId],
    references: [catracas.id],
  }),
}));

export const avaliacoesFisicasRelations = relations(
  avaliacoesFisicas,
  ({ one }) => ({
    usuario: one(usuarios, {
      fields: [avaliacoesFisicas.usuarioId],
      references: [usuarios.id],
    }),
    instrutor: one(usuarios, {
      fields: [avaliacoesFisicas.instrutorId],
      references: [usuarios.id],
      relationName: "instrutor",
    }),
  })
);

export const treinosRelations = relations(treinos, ({ one }) => ({
  usuario: one(usuarios, {
    fields: [treinos.usuarioId],
    references: [usuarios.id],
  }),
  instrutor: one(usuarios, {
    fields: [treinos.instrutorId],
    references: [usuarios.id],
    relationName: "instrutor",
  }),
}));

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  usuario: one(usuarios, {
    fields: [feedbacks.usuarioId],
    references: [usuarios.id],
  }),
}));
