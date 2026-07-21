import { saveSort, kvConfigured } from "@/lib/kv";
import { makeId } from "@/lib/id";
import { VALUE_BY_KEY } from "@/lib/values";

export const runtime = "nodejs";

export async function POST(request) {
  if (!kvConfigured) {
    return Response.json(
      { error: "Storage is not configured. Add the Upstash KV integration on Vercel." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const answers = body && body.answers;
  if (!answers || typeof answers !== "object") {
    return Response.json({ error: "Missing answers" }, { status: 400 });
  }

  // Keep only known keys with a valid tier 1-5.
  const clean = {};
  for (const [key, tier] of Object.entries(answers)) {
    if (VALUE_BY_KEY[key] && Number.isInteger(tier) && tier >= 1 && tier <= 5) {
      clean[key] = tier;
    }
  }
  if (Object.keys(clean).length === 0) {
    return Response.json({ error: "No valid answers" }, { status: 400 });
  }

  const id = makeId(10);
  const record = { id, createdAt: Date.now(), answers: clean };

  try {
    await saveSort(id, record);
  } catch {
    return Response.json({ error: "Could not save your results" }, { status: 500 });
  }

  return Response.json({ id });
}
