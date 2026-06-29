import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Trophy,
  Users,
  Cake,
} from "lucide-react";

const TOOLS = [
  {
    href: "/tools/world-cup-2026-sweepstake",
    icon: Trophy,
    title: "World Cup",
    subtitle: "Sweepstake 2026",
    gradient: "from-blue-500/20 to-purple-500/10",
    iconColor: "text-blue-300",
  },
  {
    href: "/tools/random-birthday-generator",
    icon: Cake,
    title: "Random Birthday",
    subtitle: "Generator",
    gradient: "from-pink-500/20 to-purple-500/10",
    iconColor: "text-pink-300",
  },
  {
    href: "#",
    icon: Users,
    title: "Random",
    subtitle: "Name Picker",
    gradient: "from-emerald-500/20 to-cyan-500/10",
    iconColor: "text-emerald-300",
    soon: true,
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" aria-hidden="true" />

      {/* Geometric decorative elements */}
      <div className="absolute left-[8%] top-20 hidden md:block">
        <div className="h-16 w-16 rotate-45 rounded-2xl border border-blue-500/20 bg-blue-500/5 opacity-40 blur-sm animate-drift" style={{ animationDelay: "0s" }} />
      </div>
      <div className="absolute right-[10%] top-32 hidden md:block">
        <div className="h-20 w-20 rounded-full border border-purple-500/20 bg-purple-500/5 opacity-40 blur-sm animate-drift" style={{ animationDelay: "2s" }} />
      </div>
      <div className="absolute bottom-20 left-[20%] hidden md:block">
        <div className="h-12 w-12 rotate-12 rounded-xl border border-cyan-500/20 bg-cyan-500/5 opacity-30 blur-sm animate-drift" style={{ animationDelay: "4s" }} />
      </div>
      <div className="absolute right-[25%] bottom-32 hidden md:block">
        <div className="h-10 w-10 rotate-[30deg] border-2 border-white/5 opacity-20 animate-drift" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", animationDelay: "1s" }} />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
          Cryptographically fair · Zero signup · Shareable results
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-4xl animate-fade-in text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl text-shadow-glow">
          The fairest way to run{" "}
          <span className="text-gradient-strong">random draws</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-balance text-lg text-white/60 sm:text-xl">
          From sweepstakes to team assignments — fair, fast, and
          shareable. No signup, no tracking, no bias.
        </p>

        {/* CTA */}
        <div
          className="mt-10 flex animate-fade-in flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.2s" }}
        >
          <a href="#popular-tools" className="btn-glow group flex items-center gap-2">
            <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            Start drawing now
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a href="#how-it-works" className="btn-glass">
            See how it works
          </a>
        </div>

        {/* Popular tools cards */}
        <div
          id="popular-tools"
          className="mx-auto mt-20 max-w-4xl animate-fade-in scroll-mt-24"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            — Popular tools —
          </p>
          <p className="-mt-4 mb-8 text-center text-sm text-white/40 animate-fade-in">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              Click any tool below to get started
            </span>
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-slate-800/50 to-slate-900/60 p-6 text-left transition-all duration-500 hover:border-white/[0.15] ${
                  tool.soon ? "pointer-events-none opacity-50" : "hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/5"
                }`}
              >
                {/* Hover glow backdrop */}
                <div className={`absolute -inset-x-20 -inset-y-20 scale-0 rounded-full bg-gradient-to-br ${tool.gradient} opacity-0 blur-3xl transition-all duration-700 group-hover:scale-100 group-hover:opacity-100`} />

                {/* Gradient orb decoration */}
                <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${tool.gradient} blur-2xl transition-all duration-500 group-hover:scale-[2] group-hover:opacity-80`} />

                {/* Inner content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} ring-1 ring-white/[0.08] transition-all duration-500 group-hover:scale-110 group-hover:ring-white/[0.15] group-hover:shadow-lg`}>
                    <tool.icon className={`h-7 w-7 ${tool.iconColor} transition-transform duration-500 group-hover:scale-110`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-white transition-colors duration-300 group-hover:text-white">
                    {tool.title}
                  </h3>

                  {/* Subtitle row */}
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-white/50 transition-colors duration-300 group-hover:text-white/70">
                    {tool.subtitle}
                    {tool.soon && (
                      <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 text-[10px] font-medium text-yellow-300">
                        Soon
                      </span>
                    )}
                    {!tool.soon && (
                      <ArrowRight className="h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-400" />
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div
          className="mt-12 flex animate-fade-in flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-white/50"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Cryptographically fair
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> No signup required
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Shareable links
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Print-ready results
          </span>
        </div>
      </div>
    </section>
  );
}
