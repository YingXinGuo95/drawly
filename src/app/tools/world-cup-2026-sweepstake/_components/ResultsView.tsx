"use client";

import { useMemo, useState } from "react";
import { Table, LayoutGrid, ArrowUpDown, Medal } from "lucide-react";
import { useDrawly } from "./drawly-context";
import { prizesForTemplate } from "../_lib/prizes";
import { cn } from "@/lib/utils";
import type { Assignment } from "../_lib/types";

type SortKey = "team" | "participant";
type SortDir = "asc" | "desc";

export function ResultsView() {
  const { state } = useDrawly();
  const [view, setView] = useState<"table" | "cards">("table");
  const [sortKey, setSortKey] = useState<SortKey>("team");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const sorted: Assignment[] = useMemo(() => {
    const arr = [...state.assignments];
    arr.sort((a, b) => {
      const av =
        sortKey === "team" ? a.team.name : a.participant.toLowerCase();
      const bv =
        sortKey === "team" ? b.team.name : b.participant.toLowerCase();
      const cmp = av.localeCompare(bv);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [state.assignments, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const prizes = prizesForTemplate(state.prizeTemplate, state.customPrizes);

  if (state.assignments.length === 0) {
    return (
      <div className="glass mx-auto max-w-xl p-10 text-center">
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30">
          <Table className="h-6 w-6 text-blue-300" />
        </div>
        <h2 className="text-2xl font-bold text-white">No results yet</h2>
        <p className="mt-2 text-white/60">
          Generate a sweepstake first to see results here.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {state.eventTitle || "World Cup 2026 Sweepstake"}
          </h2>
          <p className="mt-1 text-sm text-white/60">
            {state.assignments.length} assignments ·{" "}
            {state.generatedAt
              ? new Date(state.generatedAt).toLocaleString()
              : "—"}
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] p-1">
          <button
            type="button"
            onClick={() => setView("table")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              view === "table"
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white",
            )}
            aria-pressed={view === "table"}
          >
            <Table className="h-3.5 w-3.5" />
            Table
          </button>
          <button
            type="button"
            onClick={() => setView("cards")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              view === "cards"
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white",
            )}
            aria-pressed={view === "cards"}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Cards
          </button>
        </div>
      </div>

      {/* Table view */}
      {view === "table" && (
        <div className="glass overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-wider text-white/60">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleSort("participant")}
                      className="inline-flex items-center gap-1 transition-colors hover:text-white"
                    >
                      Participant
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleSort("team")}
                      className="inline-flex items-center gap-1 transition-colors hover:text-white"
                    >
                      Team
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((a, i) => (
                  <tr
                    key={`${a.participant}-${a.team.id}-${i}`}
                    className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3 text-white/40 tabular-nums">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3 font-medium text-white">
                      {a.participant}
                    </td>
                    <td className="px-4 py-3 text-white/80">
                      <span className="mr-2 inline-block text-xl">{a.team.flag}</span>
                      {a.team.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cards view */}
      {view === "cards" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((a, i) => (
            <div
              key={`${a.participant}-${a.team.id}-${i}`}
              className="group glass-subtle flex items-center gap-4 p-4 transition-all duration-300 card-lift hover:border-white/20"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-2xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
                {a.team.flag}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-white">
                  {a.team.name}
                </div>
                <div className="flex items-center gap-1.5 truncate text-xs text-white/60">
                  <Medal className="h-3 w-3 shrink-0 text-blue-300" />
                  {a.participant}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prizes */}
      <section className="mt-8">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
          Prize distribution
        </h3>
        <div className="glass p-6">
          {prizes.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between border-b border-white/5 py-2.5 last:border-0 transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{p.emoji}</span>
                <span className="text-sm font-medium text-white">{p.label}</span>
              </div>
              <div className="flex items-center gap-3">
                {state.prizePool && (
                  <span className="text-xs text-white/50">
                    {state.prizePool}
                  </span>
                )}
                <span className="text-sm font-semibold tabular-nums text-gradient">
                  {p.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}