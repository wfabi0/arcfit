import {
  decimal,
  integer,
  json,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  planModalityEnum,
  planStatusEnum,
  planTypeEnum,
} from "../enums/index.js";

export const planos = pgTable(
  "planos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    nome: varchar("nome", { length: 255 }).notNull(),
    descricao: text("descricao"),
    tipo: planTypeEnum("tipo").notNull(),
    modalidade: planModalityEnum("modalidade").notNull(),
    valor: decimal("valor", { precision: 10, scale: 2 }).notNull(),
    descontoPercentual: integer("desconto_percentual").default(0),
    beneficios: json("beneficios").$type<string[]>(),
    horarioPermitidoInicio: time("horario_permitido_inicio"),
    horarioPermitidoFim: time("horario_permitido_fim"),
    limiteAcessosMes: integer("limite_acessos_mes"),
    status: planStatusEnum("status").notNull().default("ativo"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    statusIdx: table.status,
    tipoModalidadeIdx: [table.tipo, table.modalidade],
    valorIdx: table.valor,
  })
);
