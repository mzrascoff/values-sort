// URL-safe short id, no external dependency.
const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";

// Group codes get read aloud and typed by hand, so they drop the characters
// people confuse: i, l, o, 0, 1.
const CODE_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

function pick(alphabet, len) {
  const bytes = new Uint8Array(len);
  globalThis.crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < len; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

export function makeId(len = 10) {
  return pick(ALPHABET, len);
}

export function makeCode(len = 6) {
  return pick(CODE_ALPHABET, len);
}

export function normalizeCode(raw) {
  if (typeof raw !== "string") return "";
  const code = raw.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if (code.length < 4 || code.length > 12) return "";
  return code;
}
