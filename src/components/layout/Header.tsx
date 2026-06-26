"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import logo from "@/public/logo.png";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/tools/world-cup-2026-sweepstake", label: "WC 2026" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105">
            <Image src={logo} alt="fairdraw" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-white">
              fairdraw
            </span>
            <span className="text-[10px] uppercase tracking-wider text-white/50">
              Fair Draws
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {NAV.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 transition-all",
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white",
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-lg bg-white/10" />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}