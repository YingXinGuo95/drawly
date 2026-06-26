import { HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "How to do a World Cup 2026 sweepstake with less than 48 people?",
    answer:
      "If you have fewer than 48 participants, use the Multiple mode. Each person gets multiple teams — for example, with 10 people everyone receives 4—5 teams so all 48 nations are assigned. This ensures every team in the tournament has someone cheering for it, even in small groups.",
  },
  {
    question: "Can I generate a random draw for all 48 World Cup 2026 teams?",
    answer:
      "Yes. The generator is pre-loaded with all 48 qualified nations for the 2026 FIFA World Cup, co-hosted by the United States, Canada, and Mexico. Simply enter your participants, pick your preferred mode, and click generate. Every team is randomly assigned in a single, fair draw.",
  },
  {
    question: "Is this World Cup sweepstake generator really fair and random?",
    answer:
      "Absolutely. The draw uses your browser's crypto.getRandomValues() API — a cryptographically secure random source — combined with the Fisher-Yates shuffle algorithm. This is the same standard used in security-sensitive applications. Every possible assignment of teams is equally likely, and nothing is stored or manipulated on any server.",
  },
  {
    question: "How to share World Cup 2026 sweepstake results with friends?",
    answer:
      "After generating your draw, the results page provides a shareable link that encodes all assignments into the URL. Copy the link and send it via email, WhatsApp, Twitter, or any messaging app. No account or sign-up is required — anyone with the link can view the full assignment breakdown.",
  },
  {
    question: "How many teams are in the 2026 FIFA World Cup?",
    answer:
      "The 2026 FIFA World Cup is the first edition to feature 48 teams, expanded from 32. The tournament runs from June 11 to July 19 across 16 host cities in the United States, Canada, and Mexico. The 48 teams are divided into 12 groups of 4, with the top two from each group plus the best third-placed teams advancing to the knockout stage.",
  },
  {
    question: "Can I add custom prizes to my sweepstake?",
    answer:
      "Yes. The built-in prize setup lets you choose from Classic (prizes for 1st, 2nd, 3rd place plus last place), Simple (winner takes all), or a fully Custom template. In custom mode you can add, remove, and rename prizes, assign percentage weights, and optionally set a prize pool amount. The generator automatically assigns prizes alongside teams.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FAQSection() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section
        className="mx-auto mt-6 max-w-4xl"
        aria-label="Frequently asked questions"
      >
        <div className="glass p-6 sm:p-8">
          <header className="mb-6 flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 ring-1 ring-white/10">
              <HelpCircle className="h-5 w-5 text-blue-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-white/50">
                Everything you need to know about running a World Cup 2026
                sweepstake
              </p>
            </div>
          </header>

          <div className="divide-y divide-white/5">
            {FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group open:pb-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-white/5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium text-white/80 transition-colors hover:text-white sm:text-base [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="shrink-0 text-white/30 transition-transform duration-200 group-open:rotate-180">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="pr-6 text-sm leading-relaxed text-white/50 sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
