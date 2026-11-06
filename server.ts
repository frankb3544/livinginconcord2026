import "./loadEnv.js";
import { serveStatic } from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server';
import { app } from './app.js';

// Local development server. The /_api routes live in app.ts (shared with the
// Vercel serverless function in api/index.ts); this file only adds static
// file serving (./static, then the built SPA in ./dist) and the SPA fallback,
// which vercel.json rewrites provide in production.
app.use("/*", serveStatic({ root: "./static" }));
app.use('/*', serveStatic({ root: './dist' }))
app.get("*", async (c, next) => {
  const p = c.req.path;
  if (p.startsWith("/_api")) {
    return next();
  }
  return serveStatic({ path: "./dist/index.html" })(c, next);
});
serve({ fetch: app.fetch, port: 3333 });
console.log("Running at http://localhost:3333")
