import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { membershipStatusEnum } from "../enums/index.js";
import { planos } from "./planos.js";
import { usuarios } from "./usuarios.js";

export const matriculas = pgTable(
  "matriculas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    usuarioId: uuid("usuario_id")
      .notNull()
      .references(() => usuarios.id, { onDelete: "cascade" }),
    planoId: uuid("plano_id")
      .notNull()
      .references(() => planos.id, { onDelete: "restrict" }),
    dataInicio: timestamp("data_inicio", { withTimezone: true }).notNull(),
    dataFim: timestamp("data_fim", { withTimezone: true }).notNull(),
    dataProximaCobranca: timestamp("data_proxima_cobranca", {
      withTimezone: true,
    }),
    diaVencimento: integer("dia_vencimento").notNull(),
    valorMensalidade: decimal("valor_mensalidade", {
      precision: 10,
      scale: 2,
    }).notNull(),
    status: membershipStatusEnum("status").notNull().default("ativa"),
    motivoCancelamento: text("motivo_cancelamento"),
    observacoes: text("observacoes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    usuarioStatusIdx: [table.usuarioId, table.status],
    dataFimIdx: table.dataFim,
    statusDataFimIdx: [table.status, table.dataFim],
    proximaCobrancaIdx: table.dataProximaCobranca,
  })
);
