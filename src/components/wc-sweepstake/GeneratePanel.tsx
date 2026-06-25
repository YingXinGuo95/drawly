"use client";

import { Sparkles, Flag, Trophy } from "lucide-react";
import { useDrawly } from "@/lib/drawly/context";
import { TOTAL_TEAMS } from "@/lib/drawly/teams";
import { assignTeams, recommendMode } from "@/lib/drawly/shuffle";
import { TEAMS } from "@/lib/drawly/teams";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function GeneratePanel() {
  const { state, dispatch } = useDrawly();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const count = state.participants.length;
  const recommended = count > 0 ? recommendMode(count, TOTAL_TEAMS) : null;
  const canGenerate = count > 0;

  const handleGenerate = () => {
    setError(null);
    if (count === 0) {
      setError("Please enter at least one participant.");
      return;
    }
    const assignments = assignTeams(
      state.participants,
      TEAMS,
      state.mode,
      state.modeConfig,
    );
    if (assignments.length === 0) {
      setError("Unable to assign teams with current settings.");
      return;
    }
    dispatch({ type: "SET_ASSIGNMENTS", payload: assignments });
    router.push("/tools/world-cup-2026-sweepstake/results");
  };

  return (
    <section className="glass-strong relative overflow-hidden p-6">
      <div className="absolute inset-0 bg-drawly-radial opacity-40" />
      <div className="relative">
        <header className="mb-4 flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 ring-1 ring-white/20">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Step 4 · Generate
            </h2>
            <p className="text-xs text-white/60">
              {canGenerate
                ? `${count} participant${count === 1 ? "" : "s"} · mode: ${state.mode === "standard" ? "1:1" : state.mode === "multiple" ? "multi-team" : "shared"}`
                : "Enter at least one participant to begin"}
            </p>
          </div>
        </header>

        {/* Visual stats */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
            <Flag className="mx-auto mb-1 h-4 w-4 text-blue-300" />
            <div className="text-xs text-white/50">Teams</div>
            <div className="text-xl font-bold text-white">{TOTAL_TEAMS}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
            <Sparkles className="mx-auto mb-1 h-4 w-4 text-yellow-300" />
            <div className="text-xs text-white/50">Participants</div>
            <div className="text-xl font-bold text-gradient">{count}</div>
          </div>
        </div>

        {/* Progress indicator */}
        {count > 0 && (
          <div className="mb-5">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-white/50">Coverage</span>
              <span className={cn("font-medium", count >= TOTAL_TEAMS ? "text-emerald-300" : "text-white/70")}>
                {count} / {TOTAL_TEAMS}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${Math.min(100, (count / TOTAL_TEAMS) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="btn-glow group flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          Generate sweepstake
        </button>
        <p className="mt-3 text-center text-[11px] text-white/40">
          Result is generated locally in your browser — nothing is sent to a
          server.
        </p>
      </div>
    </section>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}