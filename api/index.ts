import { handle } from 'hono/vercel';
import { app } from '../app.js';

// Vercel serverless entry point. vercel.json rewrites /_api/* to this
// function; the Hono app in app.ts (shared with the local dev server in
// server.ts) dispatches each request to the matching endpoint module.
const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
export const HEAD = handler;
