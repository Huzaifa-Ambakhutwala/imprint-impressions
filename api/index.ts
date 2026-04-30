import type { IncomingMessage, ServerResponse } from "node:http";
import { Readable } from "node:stream";

export const config = { runtime: "nodejs" };

type StartServerEntry = {
  fetch: (request: Request, ...rest: any[]) => Promise<Response>;
};

let cachedEntry: StartServerEntry | null = null;

async function getEntry(): Promise<StartServerEntry> {
  if (cachedEntry) return cachedEntry;

  // This file is produced by `npm run build` (TanStack Start SSR build).
  // Vercel will run the build step before bundling the function.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - built file exists at deploy-time, not in TS project graph
  const mod = (await import("../dist/server/index.js")) as {
    default: StartServerEntry;
  };

  cachedEntry = mod.default;
  return cachedEntry;
}

function toRequest(req: IncomingMessage, body?: Buffer) {
  const protocol =
    (req.headers["x-forwarded-proto"] as string | undefined) ||
    (req.socket as any)?.encrypted
      ? "https"
      : "http";
  const host = req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost";
  const url = new URL(req.url ?? "/", `${protocol}://${host}`);

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) headers.set(k, v.join(","));
    else headers.set(k, v);
  }

  const method = (req.method ?? "GET").toUpperCase();
  const init: RequestInit = { method, headers };
  if (!["GET", "HEAD"].includes(method) && body) init.body = body;

  return new Request(url, init);
}

async function readBody(req: IncomingMessage): Promise<Buffer | undefined> {
  const method = (req.method ?? "GET").toUpperCase();
  if (["GET", "HEAD"].includes(method)) return undefined;

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

async function sendResponse(res: ServerResponse, response: Response) {
  res.statusCode = response.status;

  response.headers.forEach((value, key) => {
    // Avoid setting hop-by-hop headers
    if (key.toLowerCase() === "transfer-encoding") return;
    res.setHeader(key, value);
  });

  if (!response.body) {
    res.end();
    return;
  }

  const nodeStream = Readable.fromWeb(response.body as any);
  nodeStream.pipe(res);
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const entry = await getEntry();
    const body = await readBody(req);
    const request = toRequest(req, body);

    const response = await entry.fetch(request, {}, {});
    await sendResponse(res, response);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.statusCode = 500;
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ status: 500, unhandled: true, message: "HTTPError" }));
  }
}

