import {
  decimal,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const configuracoesAcademia = pgTable("configuracoes_academia", {
  id: uuid("id").primaryKey().defaultRandom(),
  nomeAcademia: varchar("nome_academia", { length: 255 }).notNull(),
  cnpj: varchar("cnpj", { length: 18 }).notNull(),
  endereco: text("endereco").notNull(),
  telefone: varchar("telefone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  horarioFuncionamento: json("horario_funcionamento").$type<{
    [key: string]: {
      abertura: string;
      fechamento: string;
      fechado?: boolean;
    };
  }>(),
  capacidadeMaxima: varchar("capacidade_maxima", { length: 10 }),
  areaUtilM2: decimal("area_util_m2", { precision: 8, scale: 2 }),
  logoUrl: text("logo_url"),
  coresTema: json("cores_tema").$type<{
    primaria: string;
    secundaria: string;
    terciaria: string;
    background: string;
    texto: string;
  }>(),
  redesSociais: json("redes_sociais").$type<{
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    website?: string;
  }>(),
  taxasConfig: json("taxas_config").$type<{
    multaAtraso: number;
    jurosAtraso: number;
    taxaMatricula: number;
    taxaCancelamento: number;
  }>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
