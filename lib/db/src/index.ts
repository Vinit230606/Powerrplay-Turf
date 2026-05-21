import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Use max:1 in serverless environments to avoid connection pool exhaustion.
// Supabase's connection pooler (Transaction mode, port 6543) handles pooling externally.
const client = postgres(process.env.DATABASE_URL, { max: 1 });
export const db = drizzle(client, { schema });

export * from "./schema";
