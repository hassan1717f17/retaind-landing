import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
// No DB configured → run without persistence. Never throw at import time.
const sql = url ? postgres(url) : null;
export const db = sql ? drizzle(sql, { schema }) : null;
