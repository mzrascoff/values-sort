import { saveGroup, kvConfigured } from "@/lib/kv";
import { makeCode } from "@/lib/id";

export const runtime = "nodejs";

export async function POST(request) {
  if (!kvConfigured) {
    return Response.json(
      { error: "Storage is not configured. Add the Upstash KV integration on Vercel." },
      { status: 503 }
    );
  }

  let body = {};
  try {
    body = (await request.json()) || {};
  } catch {
    body = {};
  }

  const title = typeof body.title === "string" ? body.title.trim().slice(0, 60) : "";
  const code = makeCode(6);

  try {
    await saveGroup(code, { code, title, createdAt: Date.now() });
  } catch {
    return Response.json({ error: "Could not create the group" }, { status: 500 });
  }

  return Response.json({ code });
}
