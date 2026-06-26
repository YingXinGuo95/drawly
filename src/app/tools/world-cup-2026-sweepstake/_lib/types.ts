/**
 * Drawly 共享类型定义
 */

export interface Team {
  /** 唯一 ID，小写连字符 */
  id: string;
  /** 队伍英文名 */
  name: string;
  /** emoji 国旗 */
  flag: string;
  /** 2026 世界杯分组 A-L（待定抽签，预留） */
  group?: string;
}

export type AssignmentMode = "standard" | "multiple" | "shared";

export interface ModeConfig {
  /** 每人几队（multiple 模式） */
  teamsPerPerson?: number;
  /** 每队几人（shared 模式） */
  peoplePerTeam?: number;
}

export interface Assignment {
  participant: string;
  team: Team;
}

export type PrizeTemplate = "classic" | "simple" | "custom";

export interface Prize {
  id: string;
  label: string;
  /** 占比百分比，0-100 */
  percent: number;
  emoji: string;
}

export interface DrawlyState {
  participants: string[];
  mode: AssignmentMode;
  modeConfig: ModeConfig;
  prizeTemplate: PrizeTemplate;
  customPrizes: Prize[];
  prizePool: string;
  eventTitle: string;
  assignments: Assignment[];
  /** 分配发生时间戳 */
  generatedAt: number | null;
}

export type Action =
  | { type: "SET_PARTICIPANTS"; payload: string[] }
  | { type: "SET_MODE"; payload: { mode: AssignmentMode; config?: ModeConfig } }
  | { type: "SET_PRIZE_TEMPLATE"; payload: PrizeTemplate }
  | { type: "SET_CUSTOM_PRIZES"; payload: Prize[] }
  | { type: "SET_PRIZE_POOL"; payload: string }
  | { type: "SET_EVENT_TITLE"; payload: string }
  | { type: "SET_ASSIGNMENTS"; payload: Assignment[] }
  | { type: "RESET" }
  | { type: "HYDRATE"; payload: Partial<DrawlyState> };