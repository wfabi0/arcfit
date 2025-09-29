import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { accessMethodEnum, accessTypeEnum } from "../enums/index.js";
import { catracas } from "./catracas.js";
import { usuarios } from "./usuarios.js";

export const acessos = pgTable(
  "acessos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    usuarioId: uuid("usuario_id")
      .notNull()
      .references(() => usuarios.id, { onDelete: "cascade" }),
    catracaId: uuid("catraca_id")
      .notNull()
      .references(() => catracas.id, { onDelete: "restrict" }),
    tipo: accessTypeEnum("tipo").notNull(),
    dataHora: timestamp("data_hora", { withTimezone: true })
      .defaultNow()
      .notNull(),
    metodoAcesso: accessMethodEnum("metodo_acesso").notNull(),
    autorizado: boolean("autorizado").notNull().default(true),
    motivoBloqueio: text("motivo_bloqueio"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    usuarioDataHoraIdx: [table.usuarioId, table.dataHora],
    dataHoraTipoIdx: [table.dataHora, table.tipo],
    catracaDataHoraIdx: [table.catracaId, table.dataHora],
    autorizadoIdx: table.autorizado,
  })
);
