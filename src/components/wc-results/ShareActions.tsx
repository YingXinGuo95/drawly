"use client";

import { useState } from "react";
import {
  Copy,
  Share2,
  Printer,
  RotateCcw,
  Check,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { useDrawly } from "@/lib/drawly/context";
import { buildShareUrl } from "@/lib/drawly/share";
import { cn } from "@/lib/utils";

export function ShareActions() {
  const { state, dispatch } = useDrawly();
  const [copied, setCopied] = useState<"text" | "link" | null>(null);

  const textSummary = state.assignments
    .map(
      (a, i) =>
        `${i + 1}. ${a.team.flag} ${a.team.name} — ${a.participant}`,
    )
    .join("\n");

  const tableSummary = [
    "Participant\tTeam\tFlag",
    ...state.assignments.map(
      (a) => `${a.participant}\t${a.team.name}\t${a.team.flag}`,
    ),
  ].join("\n");

  const handleCopy = async (
    text: string,
    type: "text" | "link",
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* fallback - select and prompt */
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Clear all results and start a new draw?")) {
      dispatch({ type: "RESET" });
    }
  };

  if (state.assignments.length === 0) return null;

  const shareUrl = buildShareUrl({
    assignments: state.assignments,
    eventTitle: state.eventTitle,
    prizePool: state.prizePool,
  });

  const twitterText = encodeURIComponent(
    `Check out our World Cup 2026 sweepstake draws!`,
  );

  return (
    <div className="glass-strong relative overflow-hidden p-6 print:hidden">
      <div className="absolute inset-0 bg-drawly-radial opacity-30" />
      <div className="relative">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
          Share & export
        </h3>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ActionButton
            icon={copied === "link" ? Check : LinkIcon}
            label={copied === "link" ? "Link copied!" : "Copy share link"}
            onClick={() => handleCopy(shareUrl, "link")}
            accent
          />
          <ActionButton
            icon={copied === "text" ? Check : Copy}
            label={copied === "text" ? "Copied!" : "Copy as text"}
            onClick={() => handleCopy(tableSummary, "text")}
          />
          <ActionButton
            icon={Printer}
            label="Print"
            onClick={handlePrint}
          />
          <Link
            href="/tools/world-cup-2026-sweepstake"
            className="btn-glass flex items-center justify-center gap-2 text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            New draw
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
          <span className="text-xs text-white/50">Quick share:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-glass inline-flex items-center gap-1.5"
          >
            <Share2 className="h-3.5 w-3.5" />
            Twitter / X
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`World Cup sweepstake draws:\n${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-glass inline-flex items-center gap-1.5"
          >
            <Share2 className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent("World Cup 2026 Sweepstake Results")}&body=${encodeURIComponent(`Check out our sweepstake results!\n\n${shareUrl}`)}`}
            className="btn-ghost-glass inline-flex items-center gap-1.5"
          >
            <Share2 className="h-3.5 w-3.5" />
            Email
          </a>
        </div>

        {shareUrl && (
          <details className="mt-4">
            <summary className="cursor-pointer text-xs text-white/50 hover:text-white">
              Show raw share URL
            </summary>
            <div className="mt-2 break-all rounded-lg border border-white/10 bg-slate-950/50 p-3 font-mono text-[10px] text-white/60">
              {shareUrl}
            </div>
          </details>
        )}

        <button
          type="button"
          onClick={handleReset}
          className="mt-4 text-xs text-white/40 hover:text-red-300"
        >
          Clear all & start over
        </button>
      </div>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
  accent,
}: {
  icon: typeof Copy;
  label: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
        accent
          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:brightness-110 shadow-glow-blue"
          : "border border-white/15 bg-white/5 text-white hover:border-white/25 hover:bg-white/10",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}