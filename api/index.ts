/**
 * Vercel Serverless Function entry point.
 * Wraps the Express app so Vercel can invoke it as a serverless handler.
 *
 * Vercel's @vercel/node runtime compiles this TypeScript file directly
 * and bundles all imports, so workspace packages are resolved at build time.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../artifacts/api-server/src/app";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // VercelRequest/Response extend Node's IncomingMessage/ServerResponse,
  // which is what Express expects.
  return app(req as never, res as never);
}
