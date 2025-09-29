import { inet, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { turnstileStatusEnum, turnstileTypeEnum } from "../enums/index.js";

export const catracas = pgTable(
  "catracas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    codigo: varchar("codigo", { length: 50 }).notNull().unique(),
    marca: varchar("marca", { length: 100 }),
    modelo: varchar("modelo", { length: 100 }),
    ipAddress: inet("ip_address"),
    localizacao: varchar("localizacao", { length: 100 }),
    tipo: turnstileTypeEnum("tipo").notNull(),
    status: turnstileStatusEnum("status").notNull().default("online"),
    ultimaSincronizacao: timestamp("ultima_sincronizacao", {
      withTimezone: true,
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    codigoIdx: table.codigo,
    statusIdx: table.status,
    localizacaoIdx: table.localizacao,
  })
);
