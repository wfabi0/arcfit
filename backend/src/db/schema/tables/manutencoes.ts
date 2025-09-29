import {
  decimal,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { maintenanceStatusEnum, maintenanceTypeEnum } from "../enums/index.js";
import { equipamentos } from "./equipamentos.js";

export const manutencaoEquipamentos = pgTable(
  "manutencao_equipamentos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    equipamentoId: uuid("equipamento_id")
      .notNull()
      .references(() => equipamentos.id, { onDelete: "cascade" }),
    tipo: maintenanceTypeEnum("tipo").notNull(),
    dataInicio: timestamp("data_inicio", { withTimezone: true }).notNull(),
    dataFim: timestamp("data_fim", { withTimezone: true }),
    responsavel: varchar("responsavel", { length: 255 }),
    custo: decimal("custo", { precision: 10, scale: 2 }),
    descricaoProblema: text("descricao_problema"),
    solucaoAplicada: text("solucao_aplicada"),
    pecasTrocadas: json("pecas_trocadas").$type<
      {
        nome: string;
        quantidade: number;
        valor: number;
      }[]
    >(),
    status: maintenanceStatusEnum("status").notNull().default("agendada"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    equipamentoStatusIdx: [table.equipamentoId, table.status],
    dataInicioIdx: table.dataInicio,
    tipoStatusIdx: [table.tipo, table.status],
  })
);
