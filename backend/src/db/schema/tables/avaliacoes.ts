import {
  decimal,
  integer,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { dayOfWeekEnum, periodEnum } from "../enums/index.js";
import { usuarios } from "./usuarios.js";

export const ocupacaoHistorico = pgTable(
  "ocupacao_historico",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    dataHora: timestamp("data_hora", { withTimezone: true }).notNull(),
    totalPessoas: integer("total_pessoas").notNull(),
    capacidadeMaxima: integer("capacidade_maxima").notNull(),
    percentualOcupacao: decimal("percentual_ocupacao", {
      precision: 5,
      scale: 2,
    }).notNull(),
    diaSemana: dayOfWeekEnum("dia_semana").notNull(),
    periodo: periodEnum("periodo").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    dataHoraIdx: table.dataHora,
    periodoIdx: table.periodo,
    diaSemanaIdx: table.diaSemana,
  })
);

export const avaliacoesFisicas = pgTable(
  "avaliacoes_fisicas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    usuarioId: uuid("usuario_id")
      .notNull()
      .references(() => usuarios.id, { onDelete: "cascade" }),
    instrutorId: uuid("instrutor_id")
      .notNull()
      .references(() => usuarios.id, { onDelete: "restrict" }),
    dataAvaliacao: timestamp("data_avaliacao", {
      withTimezone: true,
    }).notNull(),
    peso: decimal("peso", { precision: 5, scale: 2 }),
    altura: decimal("altura", { precision: 3, scale: 2 }),
    imc: decimal("imc", { precision: 4, scale: 2 }),
    percentualGordura: decimal("percentual_gordura", {
      precision: 4,
      scale: 2,
    }),
    massaMuscular: decimal("massa_muscular", { precision: 5, scale: 2 }),
    medidas: json("medidas").$type<{
      pescoco?: number;
      bracos?: number;
      antebraco?: number;
      peito?: number;
      cintura?: number;
      quadril?: number;
      coxas?: number;
      panturrilha?: number;
    }>(),
    objetivos: text("objetivos"),
    restricoesMedicas: text("restricoes_medicas"),
    proximaAvaliacao: timestamp("proxima_avaliacao", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    usuarioDataIdx: [table.usuarioId, table.dataAvaliacao],
    instrutorIdx: table.instrutorId,
    proximaAvaliacaoIdx: table.proximaAvaliacao,
  })
);
