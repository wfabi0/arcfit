import {
  boolean,
  integer,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  feedbackCategoryEnum,
  feedbackStatusEnum,
  feedbackTypeEnum,
  workoutStatusEnum,
  workoutTypeEnum,
} from "../enums/index.js";
import { usuarios } from "./usuarios.js";

export const treinos = pgTable(
  "treinos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    usuarioId: uuid("usuario_id")
      .notNull()
      .references(() => usuarios.id, { onDelete: "cascade" }),
    instrutorId: uuid("instrutor_id")
      .notNull()
      .references(() => usuarios.id, { onDelete: "restrict" }),
    nome: varchar("nome", { length: 255 }).notNull(),
    tipo: workoutTypeEnum("tipo").notNull(),
    objetivo: text("objetivo"),
    dataInicio: timestamp("data_inicio", { withTimezone: true }).notNull(),
    dataFim: timestamp("data_fim", { withTimezone: true }),
    exercicios: json("exercicios").$type<
      {
        nome: string;
        series: number;
        repeticoes: string;
        carga?: string;
        observacoes?: string;
        equipamento?: string;
        musculoAlvo: string[];
      }[]
    >(),
    observacoes: text("observacoes"),
    status: workoutStatusEnum("status").notNull().default("ativo"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    usuarioStatusIdx: [table.usuarioId, table.status],
    instrutorIdx: table.instrutorId,
    tipoIdx: table.tipo,
  })
);

export const feedbacks = pgTable(
  "feedbacks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    usuarioId: uuid("usuario_id")
      .notNull()
      .references(() => usuarios.id, { onDelete: "cascade" }),
    tipo: feedbackTypeEnum("tipo").notNull(),
    categoria: feedbackCategoryEnum("categoria").notNull(),
    mensagem: text("mensagem").notNull(),
    nota: integer("nota"), // 1-5
    visivelSite: boolean("visivel_site").default(false).notNull(),
    respostaAdmin: text("resposta_admin"),
    status: feedbackStatusEnum("status").notNull().default("novo"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    usuarioStatusIdx: [table.usuarioId, table.status],
    tipoIdx: table.tipo,
    categoriaIdx: table.categoria,
    visivelSiteIdx: table.visivelSite,
    statusIdx: table.status,
  })
);
