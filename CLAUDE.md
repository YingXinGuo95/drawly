# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `pnpm dev` — Start Next.js dev server (localhost:3000)
- `pnpm build` — Production build
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint (next lint)
- `pnpm i` — Install dependencies

## Tech Stack

- **Framework**: Next.js 14 (App Router), React 18
- **Styling**: Tailwind CSS 3, shadcn/ui (base-nova style), `clsx` + `tailwind-merge` (via `cn()`)
- **Icons**: lucide-react
- **UI Primitives**: @base-ui/react (Button, etc.)
- **Logging**: pino (server-side structured JSON to stdout)
- **Package Manager**: pnpm
- **TypeScript**: strict mode, path alias `@/*` → `./src/*`

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout (dark mode, aurora BG, Header/Footer, DrawlyProvider)
│   ├── page.tsx              # Landing page (HeroSection, HowItWorks, FeaturesGrid, CTASection)
│   ├── globals.css           # Global styles, glassmorphism, animations, print styles
│   ├── robots.ts             # SEO robots config
│   ├── sitemap.ts            # SEO sitemap
│   └── tools/
│       └── world-cup-2026-sweepstake/  # The primary tool
│           ├── page.tsx                # Tool page (server component with metadata)
│           ├── results/page.tsx        # Results page (server component with metadata)
│           ├── _components/            # Client components for the tool
│           │   ├── drawly-context.tsx   # React Context + useReducer state management
│           │   ├── ParticipantInput.tsx # Step 1: enter participants
│           │   ├── ModeSelector.tsx     # Step 2: pick assignment mode
│           │   ├── PrizeSetup.tsx       # Step 3: configure prizes
│           │   ├── GeneratePanel.tsx    # Step 4: generate & redirect to results
│           │   ├── ResultsPage.tsx      # Results page (client wrapper, handles share links)
│           │   ├── ResultsView.tsx      # Table/card views with sorting
│           │   ├── ShareActions.tsx     # Share/export results
│           │   ├── PrintView.tsx        # Print-optimized view
│           │   ├── FAQSection.tsx       # SEO FAQ content
│           │   └── SeoContent.tsx       # SEO content sections
│           └── _lib/                   # Pure logic modules
│               ├── types.ts            # Shared TypeScript types
│               ├── shuffle.ts          # Fisher-Yates shuffle + secure random + participant parser
│               ├── teams.ts            # 48 WC 2026 teams data
│               ├── prizes.ts           # Prize templates & helpers
│               └── share.ts            # Base64 URL encoding/decoding for sharing
├── components/
│   ├── ui/                   # shadcn/ui components (button, card, avatar, input, etc.)
│   ├── layout/               # Header, Footer
│   └── landing/              # Landing page sections (HeroSection, HowItWorks, FeaturesGrid, CTASection)
└── lib/
    ├── utils.ts              # cn() utility
    └── logger.ts             # pino logger instance
```

## Key Architecture Patterns

### State Management (drawly-context.tsx)
- React Context + `useReducer` pattern, not Redux/Zustand.
- All tool state lives in `DrawlyState` (participants, mode, prizes, assignments, etc.)
- Actions are dispatched via a discriminated union `Action` type.
- State auto-saves to localStorage on every change (excluding `assignments` for privacy).
- Hydrates from localStorage on mount via `HYDRATE` action.

### Tool Pattern
Each tool under `src/app/tools/` follows:
- `page.tsx` — Server component exporting `Metadata`, composes client components.
- `_components/` — Client components (need `"use client"` for interactivity).
- `_lib/` — Pure functions (shuffle, data, encoding) — no React, easy to test.

### Randomness & Fairness
- Fisher-Yates shuffle with `crypto.getRandomValues()` (falls back to `Math.random`).
- Assignments happen entirely client-side — nothing sent to a server.
- Three modes: `standard` (1 person : 1 team), `multiple` (teams per person), `shared` (people per team).

### Sharing (No Server)
- Results are encoded as base64 URL parameters via the `share.ts` module.
- No backend API — results are decoded client-side from the URL.
- The `ResultsPage` component checks for `?d=` param on mount and hydrates from it.

### Design Conventions
- **Dark mode only**: `<html className="dark">` in root layout.
- **Glassmorphism**: Use `glass`, `glass-strong`, `glass-subtle` CSS classes.
- **Gradient text**: Use `text-gradient` or `text-gradient-strong` classes.
- **Glow buttons**: Use `btn-glow`, `btn-glass`, `btn-ghost-glass` classes.
- **Custom WC animations**: `wc-bg-pitch`, `wc-gold-text`, `wc-trophy-glow`, `wc-flag-row` in `globals.css`.
- **Performance note**: Aurora background avoids `backdrop-filter` and uses `position: fixed` with `pointer-events: none`.
- **shadcn/ui components** are from the `base-nova` style using `@base-ui/react` primitives.
- Import paths use the `@/` alias (e.g., `@/lib/utils`, `@/components/ui/button`).

### SEO
- Each page exports `Metadata` (Next.js metadata API).
- `layout.tsx` includes JSON-LD structured data (WebApplication schema).
- `sitemap.ts` + `robots.ts` for search engine indexing.
