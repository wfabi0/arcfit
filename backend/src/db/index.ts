import { env } from "@/config/env.js";
import * as schema from "@/db/schema/index.js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });

export const testConnection = async (): Promise<void> => {
  try {
    const result = await client`SELECT 1 as test`;
    console.log("✅ Conexão com PostgreSQL estabelecida com sucesso");
  } catch (error) {
    console.error("❌ Erro ao conectar com PostgreSQL:", error);
    throw error;
  }
};

export const closeConnection = async (): Promise<void> => {
  try {
    await client.end();
    console.log("🔌 Conexão com PostgreSQL encerrada");
  } catch (error) {
    console.error("❌ Erro ao encerrar conexão PostgreSQL:", error);
  }
};
