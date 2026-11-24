import {
  saveSort,
  kvConfigured,
  getGroup,
  addGroupMember,
  removeGroupMember,
  GROUP_LIMIT,
} from "@/lib/kv";
import { makeId, normalizeCode } from "@/lib/id";
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

  // An optional group turns a solo sort into one column of a comparison.
  const code = normalizeCode(body && body.group);
  let group = null;
  if (body && body.group && !code) {
    return Response.json({ error: "That group code does not look right" }, { status: 400 });
  }
  if (code) {
    try {
      group = await getGroup(code);
    } catch {
      group = null;
    }
    if (!group) {
      return Response.json({ error: "That group no longer exists" }, { status: 404 });
    }
  }

  const rawLabel = typeof (body && body.label) === "string" ? body.label.trim() : "";
  const label = rawLabel.slice(0, 24);

  const id = makeId(10);
  const record = { id, createdAt: Date.now(), answers: clean };
  if (group) {
    record.groupCode = group.code;
    record.label = label;
  }

  // Claim the group place first: the append is the atomic check on the size
  // limit (see addGroupMember), so nothing is saved for a sort the full group
  // turns away.
  const member = group ? { id, label, createdAt: record.createdAt } : null;
  if (group) {
    let added = false;
    try {
      added = await addGroupMember(group.code, member);
    } catch {
      return Response.json({ error: "Could not join the group. Try again." }, { status: 500 });
    }
    if (!added) {
      return Response.json(
        { error: `A group holds up to ${GROUP_LIMIT} sorts. Start another one.` },
        { status: 409 }
      );
    }
  }

  try {
    await saveSort(id, record);
  } catch {
    // Give the place back so a failed save doesn't use up one of the twelve.
    if (group) await removeGroupMember(group.code, member).catch(() => {});
    return Response.json({ error: "Could not save your results" }, { status: 500 });
  }

  return Response.json({ id, group: group ? group.code : null });
}
