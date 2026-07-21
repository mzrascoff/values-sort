// URL-safe short id, no external dependency.
const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";

export function makeId(len = 10) {
  const bytes = new Uint8Array(len);
  globalThis.crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < len; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}
