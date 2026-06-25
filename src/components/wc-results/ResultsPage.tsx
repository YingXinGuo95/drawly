"use client";

import { useEffect } from "react";
import { ResultsView } from "@/components/wc-results/ResultsView";
import { ShareActions } from "@/components/wc-results/ShareActions";
import { PrintView } from "@/components/wc-results/PrintView";
import { useDrawly } from "@/lib/drawly/context";
import { decodeShareLink } from "@/lib/drawly/share";
import { TEAMS } from "@/lib/drawly/teams";
import { Trophy, Sparkles, PartyPopper } from "lucide-react";
import Link from "next/link";

export function ResultsPage() {
  const { state, dispatch } = useDrawly();

  // 如果是从分享链接进入，尝试解码
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const token = params.get("d");
    if (token && state.assignments.length === 0) {
      const decoded = decodeShareLink(token);
      if (decoded) {
        // 通过 id 反查真实的 Team 数据（含正确的 flag 和名称）
        const teamById = new Map(TEAMS.map((t) => [t.id, t]));
        const assignments = decoded.assignments
          .map((a) => {
            const team = teamById.get(a.team.id);
            return team ? { participant: a.participant, team } : null;
          })
          .filter((x): x is NonNullable<typeof x> => x !== null);

        dispatch({
          type: "SET_ASSIGNMENTS",
          payload: assignments,
        });
        if (decoded.eventTitle) {
          dispatch({
            type: "SET_EVENT_TITLE",
            payload: decoded.eventTitle,
          });
        }
        if (decoded.prizePool) {
          dispatch({
            type: "SET_PRIZE_POOL",
            payload: decoded.prizePool,
          });
        }
      }
    }
  }, [dispatch, state.assignments.length]);

  if (state.assignments.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="glass mx-auto max-w-xl p-10 text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30">
            <Trophy className="h-6 w-6 text-blue-300" />
          </div>
          <h1 className="text-2xl font-bold text-white">No results yet</h1>
          <p className="mt-2 text-white/60">
            Generate a sweepstake first, or open a shared link.
          </p>
          <Link
            href="/tools/world-cup-2026-sweepstake"
            className="btn-glow mt-6 inline-flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Start a new draw
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-10 sm:py-14 no-print">
        {/* Banner header with celebration atmosphere */}
        <div className="wc-stadium-glow relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 p-8 sm:p-10">
          {/* Pitch background */}
          <div className="wc-bg-pitch absolute inset-0" />

          {/* Animated glow orbs */}
          <div className="absolute left-[20%] top-1/4 h-32 w-32 rounded-full bg-yellow-500/8 blur-3xl animate-pulse-soft" />
          <div className="absolute right-[20%] bottom-1/4 h-24 w-24 rounded-full bg-emerald-500/8 blur-3xl animate-pulse-soft" style={{ animationDelay: "1.5s" }} />

          <div className="absolute -right-20 -top-20 text-9xl opacity-10 select-none">
            🏆
          </div>

          <div className="relative">
            <div className="mb-4 inline-flex animate-fade-in-scale items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs">
              <PartyPopper className="h-3 w-3 text-yellow-300" />
              <span className="text-yellow-200">Sweepstake Results</span>
            </div>
            <h1 className="animate-fade-in text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                {state.eventTitle || "World Cup 2026"}
              </span>{" "}
              is set!
            </h1>
            <p className="mt-3 animate-fade-in max-w-2xl text-white/60" style={{ animationDelay: "0.15s" }}>
              Generated on{" "}
              {state.generatedAt
                ? new Date(state.generatedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "—"}{" "}
              · {state.assignments.length} assignments · Mode:{" "}
              <span className="font-medium text-white">
                {state.mode === "standard"
                  ? "1 person : 1 team"
                  : state.mode === "multiple"
                    ? `${state.modeConfig.teamsPerPerson ?? 1} teams per person`
                    : `${state.modeConfig.peoplePerTeam ?? 1} people per team`}
              </span>
            </p>
          </div>
        </div>

        <ResultsView />

        <div className="mt-8">
          <ShareActions />
        </div>
      </div>

      {/* Print-only version */}
      <PrintView />
    </>
  );
}