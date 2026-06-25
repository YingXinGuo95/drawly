import type { Metadata } from "next";
import { ParticipantInput } from "@/components/wc-sweepstake/ParticipantInput";
import { ModeSelector } from "@/components/wc-sweepstake/ModeSelector";
import { PrizeSetup } from "@/components/wc-sweepstake/PrizeSetup";
import { GeneratePanel } from "@/components/wc-sweepstake/GeneratePanel";
import { TOTAL_TEAMS } from "@/lib/drawly/teams";

export const metadata: Metadata = {
  title: "World Cup 2026 Sweepstake Generator",
  description:
    "Fairly assign all 48 World Cup 2026 teams to your group. Add participants, choose a mode, and generate a cryptographically fair draw.",
};

export default function WorldCupSweepstakePage() {
  return (
    <div className="container mx-auto px-4 py-10 sm:py-16">
      {/* Hero header with stadium atmosphere */}
      <header className="wc-stadium-glow relative mx-auto mb-14 max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 p-8 text-center sm:p-12">
        {/* Pitch gradient overlay */}
        <div className="wc-bg-pitch absolute inset-0" />

        {/* Background decorations */}
        <div className="absolute -left-20 -top-20 text-8xl opacity-[0.04] select-none">🏆</div>
        <div className="absolute -right-20 -bottom-20 text-8xl opacity-[0.04] select-none">⚽</div>

        {/* Animated glow orbs */}
        <div className="absolute left-1/4 top-1/3 h-32 w-32 rounded-full bg-emerald-500/5 blur-3xl animate-pulse-soft" />
        <div className="absolute right-1/4 top-1/2 h-24 w-24 rounded-full bg-yellow-500/5 blur-3xl animate-pulse-soft" style={{ animationDelay: "1.5s" }} />

        <div className="relative">
          {/* Badge row */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex animate-fade-in items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
              🇺🇸 USA · Canada · Mexico
            </span>
            <span className="inline-flex animate-fade-in items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              📅 Jun 11 – Jul 19, 2026
            </span>
            <span className="inline-flex animate-fade-in items-center gap-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-300">
              🏆 48 Teams
            </span>
          </div>

          {/* Title */}
          <h1 className="animate-fade-in text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            World Cup{" "}
            <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              2026
            </span>{" "}
            <br className="sm:hidden" />
            Sweepstake Generator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl animate-fade-in text-balance text-lg text-white/60">
            Fairly assign all {TOTAL_TEAMS} teams to your friends, family, or
            colleagues. Cryptographically fair, instantly shareable, zero setup.
          </p>

          {/* Team flags preview row */}
          <div className="mx-auto mt-8 max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="wc-flag-row justify-center">
              <span>🇦🇷</span><span>🇧🇷</span><span>🇫🇷</span><span>🇩🇪</span>
              <span>🇪🇸</span><span>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span><span>🇵🇹</span><span>🇳🇱</span>
              <span>🇧🇪</span><span>🇭🇷</span><span>🇺🇾</span><span>🇨🇴</span>
            </div>
            <p className="mt-2 text-[11px] text-white/40">
              {TOTAL_TEAMS} qualified nations — one random draw
            </p>
          </div>
        </div>
      </header>

      {/* Main form */}
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ParticipantInput />
          <ModeSelector />
          <PrizeSetup />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <GeneratePanel />
          </div>
        </div>
      </div>
    </div>
  );
}
