import { Redis } from "@upstash/redis";

// Accept either the Vercel KV variable names or the native Upstash names.
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const kvConfigured = Boolean(url && token);

export const redis = kvConfigured ? new Redis({ url, token }) : null;

const PREFIX = "sort:";

export async function saveSort(id, record) {
  if (!redis) throw new Error("KV not configured");
  // Store the object directly; @upstash/redis serializes JSON for us.
  await redis.set(PREFIX + id, record);
}

export async function getSort(id) {
  if (!redis) throw new Error("KV not configured");
  return await redis.get(PREFIX + id);
}
