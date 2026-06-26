"use client";

import { useDrawly } from "./drawly-context";
import { prizesForTemplate } from "../_lib/prizes";

/**
 * 打印专用的 A4 版式
 * 默认隐藏，仅在 @media print 时显示
 */
export function PrintView() {
  const { state } = useDrawly();

  if (state.assignments.length === 0) return null;

  const prizes = prizesForTemplate(state.prizeTemplate, state.customPrizes);

  return (
    <div className="print-only">
      <div className="p-8 text-black">
        <header className="mb-6 border-b-2 border-black pb-3">
          <h1 className="text-3xl font-bold">
            {state.eventTitle || "World Cup 2026 Sweepstake"}
          </h1>
          <p className="mt-1 text-sm">
            {state.generatedAt
              ? `Generated: ${new Date(state.generatedAt).toLocaleString()}`
              : ""}
            {state.prizePool && ` · Prize pool: ${state.prizePool}`}
          </p>
        </header>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-2 pr-2 text-left font-bold">#</th>
              <th className="py-2 pr-2 text-left font-bold">Participant</th>
              <th className="py-2 pr-2 text-left font-bold">Team</th>
              <th className="py-2 text-left font-bold">Flag</th>
            </tr>
          </thead>
          <tbody>
            {state.assignments.map((a, i) => (
              <tr key={i} className="border-b border-gray-300">
                <td className="py-1.5 pr-2">{i + 1}</td>
                <td className="py-1.5 pr-2 font-medium">{a.participant}</td>
                <td className="py-1.5 pr-2">{a.team.name}</td>
                <td className="py-1.5 text-lg">{a.team.flag}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <section className="mt-6">
          <h2 className="mb-2 text-lg font-bold">Prize Distribution</h2>
          <ul className="space-y-1 text-sm">
            {prizes.map((p) => (
              <li key={p.id} className="flex justify-between">
                <span>
                  {p.emoji} {p.label}
                </span>
                <span>
                  {p.percent}%
                  {state.prizePool && ` (${state.prizePool})`}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-8 border-t border-black pt-2 text-center text-xs text-gray-700">
          Created with fairdraw · fairdraw.online
        </footer>
      </div>
    </div>
  );
}