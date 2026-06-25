import { Users, Wand2, Share2 } from "lucide-react";

const STEPS = [
  {
    n: 1,
    icon: Users,
    title: "Add your group",
    desc: "Type or paste names. Duplicates are auto-removed. Supports any group size.",
  },
  {
    n: 2,
    icon: Wand2,
    title: "Choose your mode",
    desc: "Standard 1:1 assignments, multiple items per person, or shared groups — pick what fits.",
  },
  {
    n: 3,
    icon: Share2,
    title: "Draw & share",
    desc: "Generate instantly or spin the wheel. Share a link so everyone can see the results.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Three steps. Zero hassle.
          </h2>
          <p className="mt-3 text-white/60">
            From blank page to fully-shared results in under a minute.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting line (desktop) */}
          <div className="absolute left-1/2 top-16 hidden h-px w-2/3 -translate-x-1/2 md:block" aria-hidden="true">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          </div>

          {STEPS.map((s, idx) => (
            <div
              key={s.n}
              className="group relative"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="glass relative overflow-hidden p-6 transition-all duration-300 hover:bg-white/[0.08] card-lift">
                {/* Number badge */}
                <div className="absolute right-4 top-4 text-6xl font-bold text-white/[0.03] transition-colors duration-300 group-hover:text-white/[0.06] select-none">
                  {String(s.n).padStart(2, "0")}
                </div>

                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/20 group-hover:from-blue-500/40 group-hover:to-purple-500/40">
                  <s.icon className="h-5 w-5 text-blue-300 transition-transform duration-300 group-hover:scale-110" />
                </div>

                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
