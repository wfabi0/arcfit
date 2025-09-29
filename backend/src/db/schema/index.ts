export * from "./enums/index.js";

export * from "./tables/acessos.js";
export * from "./tables/avaliacoes.js";
export * from "./tables/catracas.js";
export * from "./tables/configuracoes.js";
export * from "./tables/equipamentos.js";
export * from "./tables/manutencoes.js";
export * from "./tables/matriculas.js";
export * from "./tables/pagamentos.js";
export * from "./tables/planos.js";
export * from "./tables/treinos-feedbacks.js";
export * from "./tables/usuarios.js";

export * from "./relations/index.js";

export {
  validarPlanoSchema,
  validarUsuarioSchema,
  validarLoginSchema,
} from "./validators/index.js";

import { acessos } from "./tables/acessos.js";
import { avaliacoesFisicas } from "./tables/avaliacoes.js";
import { catracas } from "./tables/catracas.js";
import { configuracoesAcademia } from "./tables/configuracoes.js";
import { equipamentos } from "./tables/equipamentos.js";
import { manutencaoEquipamentos } from "./tables/manutencoes.js";
import { matriculas } from "./tables/matriculas.js";
import { pagamentos } from "./tables/pagamentos.js";
import { planos } from "./tables/planos.js";
import { feedbacks, treinos } from "./tables/treinos-feedbacks.js";
import { usuarios } from "./tables/usuarios.js";

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
