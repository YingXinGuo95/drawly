import type {
  Assignment,
  AssignmentMode,
  ModeConfig,
  Team,
} from "./types";

/**
 * 加密级安全的随机整数：[0, max)
 * 使用 crypto.getRandomValues，失败时降级到 Math.random
 */
function secureRandomInt(max: number): number {
  if (max <= 0) return 0;
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    return Math.floor((buf[0] / 2 ** 32) * max);
  }
  return Math.floor(Math.random() * max);
}

/**
 * Fisher-Yates 洗牌算法 - 不可预测洗牌
 */
export function shuffle<T>(array: readonly T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * 根据模式分配球队
 *
 * - standard: 人数 == 球队数，一对一
 * - multiple: 人数 < 球队数，每人分 tpp 队
 * - shared:   人数 > 球队数，每队分 ppt 人
 *
 * 不会重复分配，剩余队伍/人会被截断
 */
export function assignTeams(
  participants: string[],
  teams: Team[],
  mode: AssignmentMode,
  config?: ModeConfig,
): Assignment[] {
  const shuffledTeams = shuffle(teams);
  const shuffledPeople = shuffle(participants);
  const assignments: Assignment[] = [];

  switch (mode) {
    case "standard": {
      const len = Math.min(shuffledPeople.length, shuffledTeams.length);
      for (let i = 0; i < len; i++) {
        assignments.push({
          participant: shuffledPeople[i],
          team: shuffledTeams[i],
        });
      }
      break;
    }
    case "multiple": {
      const tpp = Math.max(1, Math.floor(config?.teamsPerPerson ?? 1));
      for (let i = 0; i < shuffledPeople.length; i++) {
        for (let j = 0; j < tpp; j++) {
          const idx = i * tpp + j;
          if (idx >= shuffledTeams.length) break;
          assignments.push({
            participant: shuffledPeople[i],
            team: shuffledTeams[idx],
          });
        }
      }
      break;
    }
    case "shared": {
      const ppt = Math.max(1, Math.floor(config?.peoplePerTeam ?? 1));
      for (let i = 0; i < shuffledTeams.length; i++) {
        for (let j = 0; j < ppt; j++) {
          const idx = i * ppt + j;
          if (idx >= shuffledPeople.length) break;
          assignments.push({
            participant: shuffledPeople[idx],
            team: shuffledTeams[i],
          });
        }
      }
      break;
    }
  }

  return assignments;
}

/**
 * 智能推荐模式：根据人数与球队数（48）的关系给出最佳分配方案
 */
export function recommendMode(
  peopleCount: number,
  teamsCount = 48,
): AssignmentMode {
  if (peopleCount === teamsCount) return "standard";
  if (peopleCount < teamsCount) return "multiple";
  return "shared";
}

/**
 * 把参与者原始输入（多行/逗号）解析为去重后的数组
 */
export function parseParticipants(raw: string): string[] {
  if (!raw) return [];
  const lines = raw.split(/[\n,;]+/);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of lines) {
    const name = line.trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(name);
  }
  return out;
}