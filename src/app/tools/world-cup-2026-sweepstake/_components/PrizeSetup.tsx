"use client";

import { Trophy, Settings2, Plus, Trash2 } from "lucide-react";
import { useDrawly } from "./drawly-context";
import {
  CLASSIC_PRIZES,
  CUSTOM_PRIZES_DEFAULT,
  SIMPLE_PRIZES,
  prizesForTemplate,
  totalPercent,
} from "../_lib/prizes";
import type { Prize, PrizeTemplate } from "../_lib/types";
import { cn } from "@/lib/utils";

const TEMPLATES: Array<{
  id: PrizeTemplate;
  label: string;
  desc: string;
}> = [
  {
    id: "classic",
    label: "Classic",
    desc: "Champion 60% / Yellow 10% / Biggest win 20% / Wooden spoon 10%",
  },
  {
    id: "simple",
    label: "Simple",
    desc: "100% to the World Champion",
  },
  {
    id: "custom",
    label: "Custom",
    desc: "Build your own prize structure",
  },
];

export function PrizeSetup() {
  const { state, dispatch } = useDrawly();
  const prizes = prizesForTemplate(state.prizeTemplate, state.customPrizes);
  const sum = totalPercent(prizes);

  return (
    <section className="glass p-6">
      <header className="mb-5 flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 ring-1 ring-white/10">
          <Trophy className="h-5 w-5 text-blue-300" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">
            Step 3 · Prize setup
          </h2>
          <p className="text-xs text-white/50">
            Optional — shown on the printable results
          </p>
        </div>
      </header>

      {/* Template selector */}
      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        {TEMPLATES.map((t) => {
          const active = state.prizeTemplate === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => dispatch({ type: "SET_PRIZE_TEMPLATE", payload: t.id })}
              className={cn(
                "rounded-xl border p-3 text-left transition-all",
                active
                  ? "border-blue-400/50 bg-blue-500/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20",
              )}
            >
              <div className="text-sm font-semibold text-white">{t.label}</div>
              <div className="mt-0.5 text-[10px] leading-relaxed text-white/50">
                {t.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Prize list */}
      <div className="space-y-2">
        {prizes.map((p, i) => (
          <PrizeRow
            key={p.id}
            prize={p}
            editable={state.prizeTemplate === "custom"}
            onChange={(updated) => {
              const next = [...prizes];
              next[i] = updated;
              dispatch({ type: "SET_CUSTOM_PRIZES", payload: next });
            }}
            onRemove={
              state.prizeTemplate === "custom"
                ? () => {
                    const next = prizes.filter((_, idx) => idx !== i);
                    dispatch({
                      type: "SET_CUSTOM_PRIZES",
                      payload:
                        next.length > 0 ? next : CUSTOM_PRIZES_DEFAULT,
                    });
                  }
                : undefined
            }
          />
        ))}
        {state.prizeTemplate === "custom" && (
          <button
            type="button"
            onClick={() => {
              const next = [
                ...prizes,
                {
                  id: `prize-${Date.now()}`,
                  label: "New Prize",
                  percent: 0,
                  emoji: "🎁",
                },
              ];
              dispatch({ type: "SET_CUSTOM_PRIZES", payload: next });
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-white/30 hover:text-white"
          >
            <Plus className="h-3.5 w-3.5" />
            Add prize
          </button>
        )}
      </div>

      {/* Percent summary */}
      <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs">
        <span className="text-white/60">Total</span>
        <span
          className={cn(
            "font-semibold tabular-nums",
            sum === 100 ? "text-emerald-300" : "text-amber-300",
          )}
        >
          {sum}%
        </span>
      </div>

      {/* Prize pool input */}
      <div className="mt-4">
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-white/70">
          <Settings2 className="h-3 w-3" />
          Prize pool (optional)
        </label>
        <input
          type="text"
          value={state.prizePool}
          onChange={(e) =>
            dispatch({ type: "SET_PRIZE_POOL", payload: e.target.value })
          }
          placeholder="e.g. $120 / 5 GBP each"
          className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
        />
      </div>
    </section>
  );
}

function PrizeRow({
  prize,
  editable,
  onChange,
  onRemove,
}: {
  prize: Prize;
  editable: boolean;
  onChange: (p: Prize) => void;
  onRemove?: () => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-2">
      <span className="text-lg">{prize.emoji}</span>
      {editable ? (
        <>
          <input
            type="text"
            value={prize.label}
            onChange={(e) => onChange({ ...prize, label: e.target.value })}
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            placeholder="Prize name"
          />
          <input
            type="number"
            min={0}
            max={100}
            value={prize.percent}
            onChange={(e) =>
              onChange({
                ...prize,
                percent: Math.max(0, Math.min(100, Number(e.target.value) || 0)),
              })
            }
            className="w-16 rounded-md border border-white/10 bg-slate-950/40 px-2 py-1 text-right text-sm tabular-nums text-white outline-none focus:border-blue-400/50"
          />
          <span className="text-xs text-white/40">%</span>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-300"
              aria-label="Remove prize"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </>
      ) : (
        <>
          <span className="flex-1 text-sm text-white">{prize.label}</span>
          <span className="text-sm font-medium tabular-nums text-white/70">
            {prize.percent}%
          </span>
        </>
      )}
    </div>
  );
}

// Re-export for use elsewhere
export { CLASSIC_PRIZES, SIMPLE_PRIZES };