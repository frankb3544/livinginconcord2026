/**
 * Bundle the Hono server app (app.ts + all endpoint modules + helpers)
 * into a single self-contained ESM file for the Vercel serverless
 * function. The Floot codebase uses extensionless imports
 * (../../helpers/db) that Node's ESM loader cannot resolve at runtime
 * in the function bundle — esbuild resolves them at build time instead.
 *
 * Output: api/_app.mjs (generated on every build; gitignored).
 */
import { build } from "esbuild";

await build({
  entryPoints: ["app.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  outfile: "api/_app.mjs",
  logLevel: "info",
  banner: {
    js: "import { createRequire as __cr } from 'node:module'; const require = __cr(import.meta.url);",
  },
});
console.log("[bundle-server] api/_app.mjs written");
