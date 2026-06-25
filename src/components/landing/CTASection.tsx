import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="glass-strong group relative mx-auto max-w-4xl overflow-hidden p-10 text-center sm:p-14 transition-all duration-500 hover:border-blue-500/20">
          <div className="absolute inset-0 bg-drawly-radial opacity-50" />
          {/* Decorative glow on hover */}
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />
          <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition-all duration-500 group-hover:bg-purple-500/20" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to run your first{" "}
              <span className="text-gradient">fair draw</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              It takes less than 60 seconds. No account, no email, no nonsense.
            </p>
            <Link
              href="/tools/world-cup-2026-sweepstake"
              className="btn-glow mt-7 inline-flex items-center gap-2 group/btn"
            >
              <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12" />
              Start drawing now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
