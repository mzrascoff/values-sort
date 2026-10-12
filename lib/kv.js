import { Redis } from "@upstash/redis";

// Accept either the Vercel KV variable names or the native Upstash names.
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const kvConfigured = Boolean(url && token);

export const redis = kvConfigured ? new Redis({ url, token }) : null;

const PREFIX = "sort:";
const GROUP = "group:";

// A group is a handful of people sorting together, not a mailing list.
export const GROUP_LIMIT = 12;

export async function saveSort(id, record) {
  if (!redis) throw new Error("KV not configured");
  // Store the object directly; @upstash/redis serializes JSON for us.
  await redis.set(PREFIX + id, record);
}

export async function getSort(id) {
  if (!redis) throw new Error("KV not configured");
  return await redis.get(PREFIX + id);
}

// @upstash/redis parses JSON on read when it can, so a value may come back
// either as an object or as the string we wrote.
function revive(value) {
  if (value && typeof value === "object") return value;
  if (typeof value !== "string") return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export async function saveGroup(code, record) {
  if (!redis) throw new Error("KV not configured");
  await redis.set(GROUP + code, record);
}

export async function getGroup(code) {
  if (!redis) throw new Error("KV not configured");
  return revive(await redis.get(GROUP + code));
}

// Members are appended to a list rather than rewritten into the group object,
// so two people finishing at the same moment cannot overwrite each other.
export async function addGroupMember(code, member) {
  if (!redis) throw new Error("KV not configured");
  await redis.rpush(`${GROUP}${code}:members`, JSON.stringify(member));
}

export async function getGroupMembers(code) {
  if (!redis) throw new Error("KV not configured");
  const raw = await redis.lrange(`${GROUP}${code}:members`, 0, GROUP_LIMIT - 1);
  return (raw || []).map(revive).filter(Boolean);
}

export async function countGroupMembers(code) {
  if (!redis) throw new Error("KV not configured");
  return await redis.llen(`${GROUP}${code}:members`);
}
