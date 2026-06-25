import type { Prize, PrizeTemplate } from "./types";

export const CLASSIC_PRIZES: Prize[] = [
  { id: "champion", label: "World Champion", percent: 60, emoji: "🏆" },
  { id: "yellow", label: "Most Yellow Cards", percent: 10, emoji: "🟨" },
  { id: "bigwin", label: "Biggest Win", percent: 20, emoji: "⚽" },
  { id: "wooden", label: "Wooden Spoon", percent: 10, emoji: "🥄" },
];

export const SIMPLE_PRIZES: Prize[] = [
  { id: "champion", label: "World Champion", percent: 100, emoji: "🏆" },
];

export const CUSTOM_PRIZES_DEFAULT: Prize[] = [
  { id: "first", label: "First Place", percent: 50, emoji: "🥇" },
  { id: "second", label: "Second Place", percent: 30, emoji: "🥈" },
  { id: "third", label: "Third Place", percent: 20, emoji: "🥉" },
];

export function prizesForTemplate(
  template: PrizeTemplate,
  custom: Prize[] = CUSTOM_PRIZES_DEFAULT,
): Prize[] {
  switch (template) {
    case "classic":
      return CLASSIC_PRIZES;
    case "simple":
      return SIMPLE_PRIZES;
    case "custom":
      return custom;
  }
}

export function totalPercent(prizes: Prize[]): number {
  return prizes.reduce((sum, p) => sum + p.percent, 0);
}