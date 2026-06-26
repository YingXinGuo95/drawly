import { Trophy, Shuffle, Users } from "lucide-react";

const SECTIONS = [
  {
    icon: Trophy,
    title: "What is the World Cup 2026 Sweepstake?",
    paragraphs: [
      "The 2026 FIFA World Cup is the first edition to feature 48 teams, expanding from the traditional 32-team format. This makes running a sweepstake more exciting — and more complex — than ever before. A sweepstake generator randomly assigns each of the 48 qualified nations to participants in your group, so everyone gets a team (or several) to cheer for throughout the tournament.",
      "Hosting a World Cup sweepstake is a time-honoured tradition among fans, colleagues, and friend groups. Instead of manually drawing names from a hat — which becomes tedious and error-prone with 48 teams — our generator handles the entire process in seconds. Each participant is assigned a fair, random selection of teams, and the results can be shared instantly with a single link.",
    ],
  },
  {
    icon: Shuffle,
    title: "How does the fair draw work?",
    paragraphs: [
      "Fairness is at the core of every draw. This generator uses your browser's <code class='rounded bg-white/5 px-1.5 py-0.5 text-sm text-blue-300'>crypto.getRandomValues()</code> API — the same cryptographically secure random number generator used by security-sensitive applications — to power a Fisher-Yates shuffle. This algorithm produces a perfectly uniform permutation of all 48 teams, meaning every possible assignment order is equally likely.",
      "Unlike pseudo-random number generators (PRNGs) that rely on a seed and can be predicted, the crypto API draws entropy from the operating system's secure random source. Combined with the Fisher-Yates shuffle (which runs in O(n) time and visits each element exactly once), the result is a draw that is mathematically fair and verifiably unbiased. No server-side trickery, no hidden weighting, no human bias.",
    ],
  },
  {
    icon: Users,
    title: "Suitable for any group size",
    paragraphs: [
      "Whether you're organising a sweepstake for 5 friends or an office of 50 people, the generator adapts to your group. Choose from three flexible modes: <strong class='text-white'>Standard</strong> (one team per person), <strong class='text-white'>Multiple</strong> (several teams per person for smaller groups), and <strong class='text-white'>Shared</strong> (multiple people cheer for the same team in larger groups). Each mode intelligently distributes the 48 teams so everyone is included.",
      "The standard mode is ideal for groups of 48 — each participant gets exactly one team. For smaller groups (e.g., 10 people), the multiple mode assigns 4-5 teams per person so all 48 nations are covered. For larger groups (e.g., 60 people), the shared mode pairs multiple participants to each team. This flexibility ensures that no matter your group size, every World Cup 2026 team is assigned and every participant has a stake in the tournament.",
    ],
  },
];

export function SeoContent() {
  return (
    <section className="mx-auto mt-14 max-w-4xl space-y-6" aria-label="About this sweepstake generator">
      {SECTIONS.map((section, idx) => {
        const Icon = section.icon;
        return (
          <article
            key={section.title}
            className="glass p-6 sm:p-8"
          >
            <header className="mb-4 flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 ring-1 ring-white/10">
                <Icon className="h-5 w-5 text-blue-300" />
              </div>
              <h2 className="text-lg font-semibold text-white">
                {section.title}
              </h2>
            </header>
            <div className="space-y-3">
              {section.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-sm leading-relaxed text-white/60 sm:text-base"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}
