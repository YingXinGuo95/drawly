"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Is this truly random?",
    a: "Yes. We use your browser's crypto.getRandomValues() API — the same cryptographic standard used for security applications. Every birthday is generated with unpredictable, fair randomness.",
  },
  {
    q: "Is my data stored anywhere?",
    a: "No. Everything runs in your browser. No data is sent to any server, no cookies are used, and we don't track anything. You can verify this by checking the network tab in your browser's developer tools.",
  },
  {
    q: "Can I generate birthdays for specific age groups?",
    a: "Absolutely. Set the minimum and maximum age controls, and all generated birthdays will fall within that age range relative to today's date.",
  },
  {
    q: "What date formats are supported?",
    a: "We support ISO (YYYY-MM-DD), US (MM/DD/YYYY), European (DD/MM/YYYY), verbose (Month DD, YYYY), and year-only (YYYY) formats.",
  },
  {
    q: "How many birthdays can I generate at once?",
    a: "You can generate between 1 and 1000 birthdays at a time. Results are displayed with staggered animations and can be copied or downloaded.",
  },
  {
    q: "Can I share the results?",
    a: "Yes. Results are encoded directly into the URL — just copy the share link and send it to anyone. They'll see the exact same birthdays when they open the link.",
  },
  {
    q: "What are zodiac signs based on?",
    a: "Zodiac signs are calculated from the birth date using the tropical zodiac system. They are shown for entertainment purposes only.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto mt-16 max-w-4xl">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-white">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-slate-900/50">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.02] hover:text-white"
              >
                {faq.q}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-white/40 transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  isOpen ? "max-h-96" : "max-h-0",
                )}
              >
                <p className="px-6 pb-4 text-sm leading-relaxed text-white/60">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
