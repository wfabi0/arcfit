import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { genderEnum, userStatusEnum, userTypeEnum } from "../enums/index.js";

export const usuarios = pgTable(
  "usuarios",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    nome: varchar("nome", { length: 255 }).notNull(),
    cpf: varchar("cpf", { length: 14 }).notNull().unique(),
    rg: varchar("rg", { length: 20 }),
    dataNascimento: timestamp("data_nascimento"),
    genero: genderEnum("genero"),
    email: varchar("email", { length: 255 }).notNull().unique(),
    telefone: varchar("telefone", { length: 20 }),
    telefoneEmergencia: varchar("telefone_emergencia", { length: 20 }),
    enderecoCompleto: text("endereco_completo"),
    cep: varchar("cep", { length: 9 }),
    fotoUrl: text("foto_url"),
    senhaHash: text("senha_hash").notNull(),
    tipo: userTypeEnum("tipo").notNull().default("cliente"),
    status: userStatusEnum("status").notNull().default("ativo"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    cpfIdx: table.cpf,
    emailIdx: table.email,
    statusIdx: table.status,
    tipoStatusIdx: [table.tipo, table.status],
  })
);
