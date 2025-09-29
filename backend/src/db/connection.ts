import { env } from "@/config/env.js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index";

const connectionString = env.DATABASE_URL;

const client = postgres(connectionString, {
  prepare: false,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, {
  schema,
  logger: env.NODE_ENV === "development",
});

export type Database = typeof db;
