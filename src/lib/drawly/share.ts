import type { Assignment } from "./types";

interface SharePayload {
  v: 1;
  p: string[];
  t: string[];
  /** 标题 */
  e?: string;
  /** 奖金池 */
  m?: string;
  /** 生成时间 */
  d: number;
}

/**
 * Base64 编码（兼容中文 emoji）
 */
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

/**
 * 将分配结果编码为 URL 参数（紧凑）
 */
export function encodeShareLink(args: {
  assignments: Assignment[];
  eventTitle?: string;
  prizePool?: string;
}): string {
  const payload: SharePayload = {
    v: 1,
    p: args.assignments.map((a) => a.participant),
    t: args.assignments.map((a) => a.team.id),
    e: args.eventTitle?.trim() || undefined,
    m: args.prizePool?.trim() || undefined,
    d: Date.now(),
  };
  return b64Encode(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * 从 URL 参数中解码分配结果
 * 返回 null 表示解码失败
 */
export function decodeShareLink(token: string): {
  assignments: Assignment[];
  eventTitle?: string;
  prizePool?: string;
  generatedAt: number;
} | null {
  if (!token) return null;
  try {
    const b64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const json = b64Decode(padded);
    const payload = JSON.parse(json) as SharePayload;
    if (payload.v !== 1 || !Array.isArray(payload.p) || !Array.isArray(payload.t)) {
      return null;
    }
    if (payload.p.length !== payload.t.length) return null;
    return {
      eventTitle: payload.e,
      prizePool: payload.m,
      generatedAt: payload.d,
      assignments: payload.p.map((participant, i) => ({
        participant,
        team: { id: payload.t[i], name: payload.t[i], flag: "🏳️" },
      })),
    };
  } catch {
    return null;
  }
}

/**
 * 构建完整的分享 URL（客户端使用）
 */
export function buildShareUrl(args: {
  assignments: Assignment[];
  eventTitle?: string;
  prizePool?: string;
}): string {
  if (typeof window === "undefined") return "";
  const token = encodeShareLink(args);
  const url = new URL(window.location.origin + "/tools/world-cup-2026-sweepstake/results");
  url.searchParams.set("d", token);
  return url.toString();
}