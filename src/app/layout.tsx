import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DrawlyProvider } from "@/app/tools/world-cup-2026-sweepstake/_components/drawly-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = "https://fairdraw.online";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "fairdraw — Fair Random Draw Tool Platform",
    template: "%s | fairdraw",
  },
  description:
    "Fair, fast, and fun random draws for sweepstakes, team assignments, and more. Cryptographically fair, no signup needed, shareable results.",
  keywords: [
    "random draw generator",
    "fair sweepstake",
    "team assignment generator",
    "random name picker",
    "spin the wheel",
    "draw generator online",
    "free random draw",
  ],
  authors: [{ name: "fairdraw" }],
  creator: "fairdraw",
  openGraph: {
    title: "fairdraw — Fair Random Draw Tool Platform",
    description:
      "Fair random draws for sweepstakes, team assignments, and more. Free, no signup.",
    type: "website",
    locale: "en_US",
    siteName: "fairdraw",
  },
  twitter: {
    card: "summary_large_image",
    title: "fairdraw — Fair Random Draw Tool Platform",
    description:
      "Fair random draws for sweepstakes, team assignments, and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "fairdraw",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  description:
    "Fair random draws for sweepstakes, team assignments, and more. Cryptographically fair, no signup needed, shareable results.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "128",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn("dark font-sans", inter.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <DrawlyProvider>
          {/* Animated aurora background — fixed in viewport, no scroll repaint */}
          <div className="bg-aurora" aria-hidden="true" />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </DrawlyProvider>
      </body>
    </html>
  );
}