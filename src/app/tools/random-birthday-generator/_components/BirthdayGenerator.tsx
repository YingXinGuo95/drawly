"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Cake,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  RotateCcw,
  Calendar,
  Users,
  Link as LinkIcon,
} from "lucide-react";
import { generateBirthdays, birthdaysToText, birthdaysToCSV, birthdaysToJSON } from "../_lib/birthday";
import { buildShareUrl } from "../_lib/share";
import { decodeShareLink } from "../_lib/share";
import { formatDate, getZodiac } from "../_lib/birthday";
import type { BirthdayEntry, DateFormat } from "../_lib/types";
import { cn } from "@/lib/utils";

type DateFormatOption = { value: DateFormat; label: string };

const FORMATS: DateFormatOption[] = [
  { value: "YYYY-MM-DD", label: "ISO (YYYY-MM-DD)" },
  { value: "MM/DD/YYYY", label: "US (MM/DD/YYYY)" },
  { value: "DD/MM/YYYY", label: "EU (DD/MM/YYYY)" },
  { value: "Month DD, YYYY", label: "Verbose (Month DD, YYYY)" },
  { value: "YYYY", label: "Year only (YYYY)" },
];

export default function BirthdayGenerator() {
  const [count, setCount] = useState(10);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(65);
  const [format, setFormat] = useState<DateFormat>("YYYY-MM-DD");
  const [showZodiac, setShowZodiac] = useState(true);
  const [entries, setEntries] = useState<BirthdayEntry[]>([]);
  const [generated, setGenerated] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [animating, setAnimating] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Handle share link decoding on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const token = params.get("d");
    if (!token || generated) return;

    const decoded = decodeShareLink(token);
    if (decoded) {
      setCount(decoded.c);
      setMinAge(decoded.a);
      setFormat(decoded.f);
      setShowZodiac(decoded.z);

      const restored: BirthdayEntry[] = decoded.d.map((dateStr) => {
        const date = new Date(dateStr + "T00:00:00");
        return {
          date,
          formatted: formatDate(date, decoded.f),
          zodiac: decoded.z ? getZodiac(date) : { name: "", emoji: "" },
        };
      });
      setEntries(restored);
      setGenerated(true);
      setAnimating(true);
      setTimeout(() => setAnimating(false), 100 + restored.length * 50);
    }
  }, [generated]);

  const handleGenerate = useCallback(() => {
    const results = generateBirthdays(count, minAge, maxAge, format, showZodiac);
    setEntries(results);
    setGenerated(true);
    setAnimating(true);
    // Clear share link from URL
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("d");
      window.history.replaceState({}, "", url.toString());
    }
    // Staggered animation
    setTimeout(() => setAnimating(false), 100 + results.length * 50);
  }, [count, minAge, maxAge, format, showZodiac]);

  const handleCopySingle = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // fallback
    }
  };

  const handleCopyAll = async () => {
    try {
      const text = birthdaysToText(entries, showZodiac);
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyLink = async () => {
    const url = buildShareUrl({ entries, minAge, maxAge, format, showZodiac });
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = (type: "txt" | "csv" | "json") => {
    let content: string;
    let mime: string;
    let ext: string;

    switch (type) {
      case "txt":
        content = birthdaysToText(entries, showZodiac);
        mime = "text/plain";
        ext = "txt";
        break;
      case "csv":
        content = birthdaysToCSV(entries);
        mime = "text/csv";
        ext = "csv";
        break;
      case "json":
        content = birthdaysToJSON(entries);
        mime = "application/json";
        ext = "json";
        break;
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `birthdays.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:py-16">
      {/* Hero header */}
      <header className="relative mx-auto mb-14 max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 p-8 text-center sm:p-12">
        {/* Background decorations */}
        <div className="absolute -left-20 -top-20 text-8xl opacity-[0.04] select-none">🎂</div>
        <div className="absolute -right-20 -bottom-20 text-8xl opacity-[0.04] select-none">📅</div>

        {/* Animated glow orbs */}
        <div className="absolute left-1/4 top-1/3 h-32 w-32 rounded-full bg-pink-500/5 blur-3xl animate-pulse-soft" />
        <div className="absolute right-1/4 top-1/2 h-24 w-24 rounded-full bg-purple-500/5 blur-3xl animate-pulse-soft" style={{ animationDelay: "1.5s" }} />

        <div className="relative">
          {/* Badge row */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex animate-fade-in items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
              <Sparkles className="h-3 w-3" />
              Cryptographically Fair
            </span>
            <span className="inline-flex animate-fade-in items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Zero Signup
            </span>
            <span className="inline-flex animate-fade-in items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
              Instant Copy
            </span>
          </div>

          {/* Title */}
          <h1 className="animate-fade-in text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            Random{" "}
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Birthday
            </span>{" "}
            <br className="sm:hidden" />
            Generator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl animate-fade-in text-balance text-lg text-white/60">
            Generate cryptographically fair random birthdays for testing, gaming,
            and privacy. No signup, no tracking.
          </p>
        </div>
      </header>

      {/* Main layout */}
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
        {/* Config panel */}
        <div className="space-y-6 lg:col-span-2">
          <section className="glass p-6">
            <header className="mb-5 flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 ring-1 ring-white/10">
                <SettingsIcon className="h-5 w-5 text-pink-300" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Configuration
                </h2>
                <p className="text-xs text-white/50">
                  Set your preferences and generate
                </p>
              </div>
            </header>

            <div className="grid gap-5 sm:grid-cols-2" onKeyDown={handleKeyDown}>
              {/* Count */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-white/80">
                  <Users className="h-4 w-4 text-blue-300" />
                  Number of birthdays
                </label>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={count}
                  onChange={(e) =>
                    setCount(
                      Math.max(1, Math.min(1000, Number(e.target.value) || 1)),
                    )
                  }
                  className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                />
                <p className="mt-1 text-xs text-white/40">1 – 1000</p>
              </div>

              {/* Date format */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-white/80">
                  <Calendar className="h-4 w-4 text-purple-300" />
                  Date format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as DateFormat)}
                  className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                >
                  {FORMATS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Min age */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-white/80">
                  <Cake className="h-4 w-4 text-emerald-300" />
                  Minimum age
                </label>
                <input
                  type="number"
                  min={0}
                  max={maxAge}
                  value={minAge}
                  onChange={(e) => {
                    const v = Number(e.target.value) || 0;
                    setMinAge(Math.max(0, Math.min(maxAge, v)));
                  }}
                  className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                />
              </div>

              {/* Max age */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-white/80">
                  <Cake className="h-4 w-4 text-rose-300" />
                  Maximum age
                </label>
                <input
                  type="number"
                  min={minAge}
                  max={120}
                  value={maxAge}
                  onChange={(e) => {
                    const v = Number(e.target.value) || 0;
                    setMaxAge(Math.max(minAge, Math.min(120, v)));
                  }}
                  className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                />
              </div>

              {/* Zodiac toggle */}
              <div className="flex items-center gap-3 sm:col-span-2">
                <button
                  type="button"
                  onClick={() => setShowZodiac(!showZodiac)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
                    showZodiac
                      ? "border-purple-400/50 bg-purple-500/10 text-purple-200"
                      : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20",
                  )}
                >
                  <span className="text-base">♈</span>
                  Include zodiac signs
                  {showZodiac && <Check className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Generate panel (sidebar) */}
        <div className="lg:col-span-1">
          <section className="glass-strong relative overflow-hidden p-6">
            <div className="absolute inset-0 bg-drawly-radial opacity-40" />
            <div className="relative">
              <header className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 ring-1 ring-white/20">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Generate
                  </h2>
                  <p className="text-xs text-white/60">
                    {count === 1 ? "1 birthday" : `${count} birthdays`}
                    {" · "}
                    {minAge}–{maxAge} yrs
                  </p>
                </div>
              </header>

              <button
                type="button"
                onClick={handleGenerate}
                className="btn-glow group flex w-full items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                Generate Birthdays
              </button>
              <p className="mt-3 text-center text-[11px] text-white/40">
                Press Enter to generate · Result is local only
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Results */}
      {generated && (
        <div className="mx-auto mt-8 max-w-6xl" ref={resultsRef}>
          <section className="glass p-6">
            <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 ring-1 ring-white/10">
                  <Cake className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Generated {entries.length}{" "}
                    {entries.length === 1 ? "birthday" : "birthdays"}
                  </h2>
                  <p className="text-xs text-white/50">
                    Age range: {minAge}–{maxAge} years
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <ActionBtn
                  icon={copiedAll ? Check : Copy}
                  label={copiedAll ? "Copied!" : "Copy all"}
                  onClick={handleCopyAll}
                  success={copiedAll}
                />
                <ActionBtn
                  icon={copiedLink ? Check : LinkIcon}
                  label={copiedLink ? "Copied!" : "Share link"}
                  onClick={handleCopyLink}
                  success={copiedLink}
                  accent
                />
                <div className="relative group/download">
                  <ActionBtn
                    icon={Download}
                    label="Download"
                    onClick={() => handleDownload("txt")}
                  />
                  <div className="absolute right-0 top-full z-20 mt-1 hidden w-32 overflow-hidden rounded-lg border border-white/10 bg-slate-900 shadow-lg group-hover/download:block">
                    <button
                      type="button"
                      onClick={() => handleDownload("txt")}
                      className="w-full px-3 py-2 text-left text-xs text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      .txt
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload("csv")}
                      className="w-full px-3 py-2 text-left text-xs text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      .csv
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload("json")}
                      className="w-full px-3 py-2 text-left text-xs text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      .json
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEntries([]);
                    setGenerated(false);
                  }}
                  className="btn-ghost-glass inline-flex items-center gap-1.5 text-sm"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>
            </header>

            {/* Results list */}
            <div className="rounded-xl border border-white/10 bg-slate-950/30">
              <div className="divide-y divide-white/5">
                {entries.map((entry, i) => (
                  <div
                    key={`${entry.formatted}-${i}`}
                    className={cn(
                      "flex items-center justify-between px-4 py-2.5 transition-all hover:bg-white/[0.03]",
                      animating && "opacity-0",
                    )}
                    style={{
                      animation: animating
                        ? "none"
                        : `fade-in 0.3s ease-out forwards`,
                      animationDelay: animating
                        ? "0ms"
                        : `${i * 50}ms`,
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="shrink-0 w-6 text-xs text-white/30 tabular-nums text-right">
                        {i + 1}.
                      </span>
                      <span className="font-mono text-sm text-white">
                        {entry.formatted}
                      </span>
                      {showZodiac && entry.zodiac.name && (
                        <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-xs text-white/50">
                          {entry.zodiac.emoji} {entry.zodiac.name}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopySingle(entry.formatted, i)
                      }
                      className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-md text-white/30 transition-colors hover:bg-white/10 hover:text-white"
                      aria-label={`Copy birthday ${i + 1}`}
                    >
                      {copiedIndex === i ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Zodiac legend (mobile) */}
            {showZodiac && (
              <div className="mt-3 flex flex-wrap gap-1.5 sm:hidden">
                {Array.from(new Set(entries.filter((e) => e.zodiac.name).map((e) => `${e.zodiac.emoji} ${e.zodiac.name}`))).map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/50"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Share URL debug */}
      {generated && entries.length > 0 && (
        <details className="mx-auto mt-4 max-w-6xl">
          <summary className="cursor-pointer text-xs text-white/50 hover:text-white">
            Show raw share URL
          </summary>
          <div className="mt-2 break-all rounded-lg border border-white/10 bg-slate-950/50 p-3 font-mono text-[10px] text-white/60">
            {buildShareUrl({ entries, minAge, maxAge, format, showZodiac })}
          </div>
        </details>
      )}
    </div>
  );
}

function ActionBtn({
  icon: Icon,
  label,
  onClick,
  accent,
  success,
}: {
  icon: typeof Copy;
  label: string;
  onClick: () => void;
  accent?: boolean;
  success?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all whitespace-nowrap",
        accent
          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:brightness-110 shadow-glow-blue"
          : "border border-white/15 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/10",
        success && "!border-emerald-400/50 !bg-emerald-500/10 !text-emerald-300",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}
