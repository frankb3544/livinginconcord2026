// Vercel serverless entry point. vercel.json rewrites /_api/* to this
// function. The Hono app is bundled by scripts/bundle-server.mjs into
// ./_app.mjs during the build (the codebase's extensionless imports
// cannot be resolved by Node's ESM loader directly). The local dev
// server (server.ts) runs the same app from source via tsx.
// @ts-ignore - generated at build time
import { app } from './_app.mjs';
import { handle } from 'hono/vercel';

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
export const HEAD = handler;
