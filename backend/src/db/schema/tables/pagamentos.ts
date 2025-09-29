import {
  decimal,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { paymentMethodEnum, paymentStatusEnum } from "../enums/index.js";
import { matriculas } from "./matriculas.js";

export const pagamentos = pgTable(
  "pagamentos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    matriculaId: uuid("matricula_id")
      .notNull()
      .references(() => matriculas.id, { onDelete: "cascade" }),
    valor: decimal("valor", { precision: 10, scale: 2 }).notNull(),
    valorPago: decimal("valor_pago", { precision: 10, scale: 2 }),
    dataVencimento: timestamp("data_vencimento", {
      withTimezone: true,
    }).notNull(),
    dataPagamento: timestamp("data_pagamento", { withTimezone: true }),
    formaPagamento: paymentMethodEnum("forma_pagamento"),
    status: paymentStatusEnum("status").notNull().default("pendente"),
    multa: decimal("multa", { precision: 10, scale: 2 }).default("0.00"),
    juros: decimal("juros", { precision: 10, scale: 2 }).default("0.00"),
    desconto: decimal("desconto", { precision: 10, scale: 2 }).default("0.00"),
    referenciaMes: varchar("referencia_mes", { length: 7 }), // YYYY-MM
    comprovanteUrl: text("comprovante_url"),
    gatewayTransactionId: varchar("gateway_transaction_id", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    matriculaStatusIdx: [table.matriculaId, table.status],
    dataVencimentoIdx: table.dataVencimento,
    statusVencimentoIdx: [table.status, table.dataVencimento],
    referenciaMesIdx: table.referenciaMes,
    gatewayTransactionIdx: table.gatewayTransactionId,
  })
);
