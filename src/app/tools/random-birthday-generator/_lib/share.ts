import type { BirthdayEntry, DateFormat, SharePayload } from "./types";

function b64Encode(str: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(str, "utf-8").toString("base64");
  }
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function b64Decode(b64: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(b64, "base64").toString("utf-8");
  }
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function encodeShareLink(args: {
  entries: BirthdayEntry[];
  minAge: number;
  maxAge: number;
  format: DateFormat;
  showZodiac: boolean;
}): string {
  const payload: SharePayload = {
    v: 1,
    c: args.entries.length,
    a: args.minAge,
    f: args.format,
    z: args.showZodiac,
    d: args.entries.map((e) => e.date.toISOString().split("T")[0]),
  };
  return b64Encode(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeShareLink(token: string): Omit<SharePayload, "v"> | null {
  if (!token) return null;
  try {
    const b64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const json = b64Decode(padded);
    const payload = JSON.parse(json) as SharePayload;
    if (
      payload.v !== 1 ||
      !Array.isArray(payload.d) ||
      typeof payload.c !== "number"
    ) {
      return null;
    }
    return {
      c: payload.c,
      a: payload.a,
      f: payload.f,
      z: payload.z,
      d: payload.d,
    };
  } catch {
    return null;
  }
}

export function buildShareUrl(args: {
  entries: BirthdayEntry[];
  minAge: number;
  maxAge: number;
  format: DateFormat;
  showZodiac: boolean;
}): string {
  if (typeof window === "undefined") return "";
  const token = encodeShareLink(args);
  const url = new URL(
    window.location.origin + "/tools/random-birthday-generator",
  );
  url.searchParams.set("d", token);
  return url.toString();
}
