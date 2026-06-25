import {
  Target,
  Sparkles,
  Printer,
  Link2,
  Lock,
  Monitor,
} from "lucide-react";

const FEATURES = [
  {
    icon: Target,
    title: "Truly fair draws",
    desc: "Fisher-Yates shuffle seeded by your browser's crypto API. No one can game it.",
    accent: "from-blue-500/20 to-blue-500/0",
    border: "hover:border-blue-500/30",
  },
  {
    icon: Sparkles,
    title: "Cinematic spin wheel",
    desc: "Beautiful dual-wheel animation with smooth deceleration. Perfect for office reveals.",
    accent: "from-purple-500/20 to-purple-500/0",
    border: "hover:border-purple-500/30",
  },
  {
    icon: Printer,
    title: "Print-ready output",
    desc: "Clean A4 layout with full assignment breakdown. Print, pin, done.",
    accent: "from-pink-500/20 to-pink-500/0",
    border: "hover:border-pink-500/30",
  },
  {
    icon: Link2,
    title: "Shareable links",
    desc: "Results encoded into a URL. No server, no database, no tracking.",
    accent: "from-cyan-500/20 to-cyan-500/0",
    border: "hover:border-cyan-500/30",
  },
  {
    icon: Lock,
    title: "Privacy first",
    desc: "Everything runs in your browser. Names never leave your device.",
    accent: "from-emerald-500/20 to-emerald-500/0",
    border: "hover:border-emerald-500/30",
  },
  {
    icon: Monitor,
    title: "Fullscreen mode",
    desc: "Big-screen friendly for live reveals. Keyboard shortcuts included.",
    accent: "from-amber-500/20 to-amber-500/0",
    border: "hover:border-amber-500/30",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need for a fair draw.
          </h2>
          <p className="mt-3 text-white/60">
            Built for offices, friend groups, and anyone who hates spreadsheets.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, idx) => (
            <div
              key={f.title}
              className={`group glass relative overflow-hidden p-6 transition-all duration-300 card-lift ${f.border}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div
                className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${f.accent} blur-2xl transition-all duration-500 group-hover:scale-150`}
              />
              <div className="relative">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/20 group-hover:bg-white/10">
                  <f.icon className="h-5 w-5 text-blue-300 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
