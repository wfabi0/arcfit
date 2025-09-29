/// <reference types="node" />
import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL as string;

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
