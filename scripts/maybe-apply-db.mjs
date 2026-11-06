/**
 * Build gate: runs the one-time DB bootstrap only when APPLY_DB_SETUP=1
 * is present in the build environment; otherwise a no-op so normal
 * builds (local, production) are unaffected.
 */
import { execFileSync } from "node:child_process";

if (process.env.APPLY_DB_SETUP === "1") {
  console.log("[build] APPLY_DB_SETUP=1 — running database bootstrap");
  execFileSync("npx", ["tsx", "scripts/apply-db-setup.ts"], { stdio: "inherit" });
} else {
  console.log("[build] APPLY_DB_SETUP not set — skipping database bootstrap");
}
