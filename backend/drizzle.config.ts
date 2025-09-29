/// <reference types="node" />
import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL as string;

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  driver: "pglite",
  dbCredentials: {
    url: DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
