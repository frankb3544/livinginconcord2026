/**
 * One-time database bootstrap, run inside the Vercel build environment
 * where the Neon connection string is available as an env var.
 *
 * Invoked only when APPLY_DB_SETUP=1 (set temporarily on the Preview
 * environment for the first deployment, then removed):
 *   - if the public schema has no tables yet, applies db/schema.sql
 *   - then runs the idempotent seed scripts (scripts/seed.ts,
 *     scripts/seed-lic1.ts) as child processes
 *
 * Safe to re-run: schema application is skipped when tables exist, and
 * the seed scripts use ON CONFLICT DO NOTHING.
 */
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import postgres from "postgres";

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error("[db-setup] No DATABASE_URL(_UNPOOLED) in env — aborting.");
  process.exit(1);
}

const sql = postgres(url, { max: 1 });

try {
  const rows = await sql`
    SELECT COUNT(*)::int AS n FROM information_schema.tables
    WHERE table_schema = 'public'`;
  const n = rows[0].n as number;
  console.log(`[db-setup] public tables present: ${n}`);

  if (n === 0) {
    const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");
    const statements = schema
      .split(/;\s*\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    console.log(`[db-setup] applying schema: ${statements.length} statements`);
    for (const stmt of statements) {
      await sql.unsafe(stmt);
    }
    console.log("[db-setup] schema applied");
  } else {
    console.log("[db-setup] schema already present — skipping DDL");
  }
} finally {
  await sql.end();
}

for (const script of ["scripts/seed.ts", "scripts/seed-lic1.ts"]) {
  console.log(`[db-setup] running ${script}`);
  execFileSync("npx", ["tsx", script], {
    stdio: "inherit",
    env: { ...process.env, DATABASE_URL: url },
  });
}
// Admin user: created/promoted when ADMIN_PASSWORD is present in the
// build environment (Frank sets it in the Vercel dashboard; the value
// never leaves Vercel). Idempotent — create-admin upserts by email.
if (process.env.ADMIN_PASSWORD) {
  console.log("[db-setup] ADMIN_PASSWORD present — running create-admin");
  execFileSync("npx", ["tsx", "scripts/create-admin.ts"], {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: url,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || "febellamy@me.com",
    },
  });
} else {
  console.log("[db-setup] no ADMIN_PASSWORD in env — skipping admin setup");
}
console.log("[db-setup] done");
