import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-slate-950/40 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                D
              </div>
              <span className="text-base font-bold text-white">fairdraw</span>
            </div>
            <p className="text-sm text-white/60">
              The fairest way to run fair draws. Free, no
              signup, no tracking.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
              Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tools/random-birthday-generator"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Random Birthday Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/world-cup-2026-sweepstake"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  WC 2026 Sweepstake
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/world-cup-2026-sweepstake/results"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Results
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
              About
            </h3>
            <p className="text-sm text-white/60">
              All draws use cryptographically secure randomness. Team flags are
              trademarks of their respective federations.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          <p>
            fairdraw &mdash; Fair random draws for every occasion. &copy;{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}