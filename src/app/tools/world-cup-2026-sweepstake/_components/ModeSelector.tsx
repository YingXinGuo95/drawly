"use client";

import { Wand2, Users, Shuffle, Plus, Minus } from "lucide-react";
import { useDrawly } from "./drawly-context";
import { TOTAL_TEAMS } from "../_lib/teams";
import { recommendMode } from "../_lib/shuffle";
import type { AssignmentMode } from "../_lib/types";
import { cn } from "@/lib/utils";

const MODES: Array<{
  id: AssignmentMode;
  title: string;
  desc: string;
  icon: typeof Users;
}> = [
  {
    id: "standard",
    title: "Standard",
    desc: `1 person : 1 team — perfect for ${TOTAL_TEAMS} participants`,
    icon: Users,
  },
  {
    id: "multiple",
    title: "Multiple teams",
    desc: `Fewer people than teams — each person gets N teams`,
    icon: Shuffle,
  },
  {
    id: "shared",
    title: "Shared teams",
    desc: `More people than teams — each team goes to N people`,
    icon: Wand2,
  },
];

export function ModeSelector() {
  const { state, dispatch } = useDrawly();
  const count = state.participants.length;
  const recommended = count > 0 ? recommendMode(count, TOTAL_TEAMS) : null;

  const updateMode = (mode: AssignmentMode) => {
    const config =
      mode === "multiple"
        ? { teamsPerPerson: state.modeConfig.teamsPerPerson ?? 2 }
        : mode === "shared"
          ? { peoplePerTeam: state.modeConfig.peoplePerTeam ?? 2 }
          : {};
    dispatch({ type: "SET_MODE", payload: { mode, config } });
  };

  return (
    <section className="glass p-6">
      <header className="mb-5 flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 ring-1 ring-white/10">
          <Shuffle className="h-5 w-5 text-blue-300" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">
            Step 2 · Choose a mode
          </h2>
          <p className="text-xs text-white/50">
            {recommended
              ? `Recommended for ${count} ${count === 1 ? "person" : "people"}: ${MODES.find((m) => m.id === recommended)?.title}`
              : "Standard works for exactly 48 participants"}
          </p>
        </div>
      </header>

      <div className="grid gap-3">
        {MODES.map((m) => {
          const isActive = state.mode === m.id;
          const isRecommended = recommended === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => updateMode(m.id)}
              className={cn(
                "group relative flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                isActive
                  ? "border-blue-400/50 bg-blue-500/10 shadow-glow-blue"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]",
              )}
            >
              <div
                className={cn(
                  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1",
                  isActive
                    ? "bg-blue-500/30 text-blue-200 ring-blue-300/30"
                    : "bg-white/5 text-white/70 ring-white/10",
                )}
              >
                <m.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    {m.title}
                  </span>
                  {isRecommended && (
                    <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-white/60">{m.desc}</p>
              </div>
              <div
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 transition-all",
                  isActive
                    ? "border-blue-400 bg-blue-400"
                    : "border-white/20 group-hover:border-white/40",
                )}
              >
                {isActive && (
                  <div className="m-auto mt-0.5 h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Numeric config */}
      {state.mode === "multiple" && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <label className="text-sm font-medium text-white">
            Teams per person
          </label>
          <p className="mb-3 text-xs text-white/50">
            {count} × {state.modeConfig.teamsPerPerson ?? 2} ={" "}
            {count * (state.modeConfig.teamsPerPerson ?? 2)} teams assigned
            (max {TOTAL_TEAMS})
          </p>
          <NumberStepper
            value={state.modeConfig.teamsPerPerson ?? 2}
            min={1}
            max={Math.floor(TOTAL_TEAMS / Math.max(count, 1))}
            onChange={(v) =>
              dispatch({
                type: "SET_MODE",
                payload: {
                  mode: "multiple",
                  config: { teamsPerPerson: v },
                },
              })
            }
          />
        </div>
      )}

      {state.mode === "shared" && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <label className="text-sm font-medium text-white">
            People per team
          </label>
          <p className="mb-3 text-xs text-white/50">
            {TOTAL_TEAMS} × {state.modeConfig.peoplePerTeam ?? 2} ={" "}
            {TOTAL_TEAMS * (state.modeConfig.peoplePerTeam ?? 2)} slots (
            {count} available)
          </p>
          <NumberStepper
            value={state.modeConfig.peoplePerTeam ?? 2}
            min={1}
            max={Math.max(1, Math.ceil(count / TOTAL_TEAMS))}
            onChange={(v) =>
              dispatch({
                type: "SET_MODE",
                payload: {
                  mode: "shared",
                  config: { peoplePerTeam: v },
                },
              })
            }
          />
        </div>
      )}
    </section>
  );
}

function NumberStepper({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-slate-950/40 p-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
        aria-label="Decrease"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-10 px-3 text-center text-sm font-medium text-white tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
        aria-label="Increase"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}