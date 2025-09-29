import {
  decimal,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { equipmentCategoryEnum, equipmentStatusEnum } from "../enums/index.js";

export const equipamentos = pgTable(
  "equipamentos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    nome: varchar("nome", { length: 255 }).notNull(),
    marca: varchar("marca", { length: 100 }),
    modelo: varchar("modelo", { length: 100 }),
    numeroSerie: varchar("numero_serie", { length: 100 }),
    categoria: equipmentCategoryEnum("categoria").notNull(),
    dataAquisicao: timestamp("data_aquisicao"),
    valorAquisicao: decimal("valor_aquisicao", { precision: 10, scale: 2 }),
    fornecedor: varchar("fornecedor", { length: 255 }),
    garantiaAte: timestamp("garantia_ate"),
    localizacaoAcademia: varchar("localizacao_academia", { length: 100 }),
    status: equipmentStatusEnum("status").notNull().default("disponivel"),
    horasUsoTotal: integer("horas_uso_total").default(0),
    ultimaManutencao: timestamp("ultima_manutencao"),
    proximaManutencao: timestamp("proxima_manutencao"),
    qrCode: varchar("qr_code", { length: 255 }).unique(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    statusCategoriaIdx: [table.status, table.categoria],
    qrCodeIdx: table.qrCode,
    proximaManutencaoIdx: table.proximaManutencao,
    localizacaoIdx: table.localizacaoAcademia,
  })
);
