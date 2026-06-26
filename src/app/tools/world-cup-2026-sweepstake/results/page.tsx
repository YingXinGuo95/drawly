import type { Metadata } from "next";
import { ResultsPage } from "../_components/ResultsPage";

export const metadata: Metadata = {
  title: "Results — World Cup 2026 Sweepstake",
  description:
    "View your World Cup 2026 sweepstake results. Share with friends, print, or export.",
};

export default function WorldCupResultsPage() {
  return <ResultsPage />;
}
