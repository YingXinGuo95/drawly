import type { Metadata } from "next";
import BirthdayGenerator from "./_components/BirthdayGenerator";
import { SeoContent } from "./_components/SeoContent";
import { FAQSection } from "./_components/FAQSection";

export const metadata: Metadata = {
  title: "Random Birthday Generator",
  description:
    "Generate cryptographically fair random birthdays for testing, gaming, role-playing, and privacy. Free, no signup, instant copy, and shareable results.",
  keywords: [
    "random birthday generator",
    "birthday generator",
    "random date generator",
    "fake birthday generator",
    "random age generator",
    "birthday picker",
    "random person generator",
  ],
  openGraph: {
    title: "Random Birthday Generator — fairdraw",
    description:
      "Generate random birthdays for testing, gaming, and privacy. Cryptographically fair, no signup.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Birthday Generator — fairdraw",
    description:
      "Generate random birthdays for testing, gaming, and privacy.",
  },
};

export default function RandomBirthdayGeneratorPage() {
  return (
    <>
      <BirthdayGenerator />
      <div className="container mx-auto max-w-6xl px-4 pb-16">
        <SeoContent />
        <FAQSection />
      </div>
    </>
  );
}
