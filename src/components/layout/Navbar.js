"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Smartphone } from "lucide-react";
import { NAV_LINKS } from "@/data/content";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2E3A4E]/40 bg-[#0B0F19]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#059669] to-[#34D399] shadow-md shadow-[#059669]/20">
            <Zap className="h-6 w-6 text-[#0B0F19]" fill="#0B0F19" />
          </div>
          <span className="font-outfit text-xl font-bold tracking-tight text-white">
            EVRE<span className="text-[#34D399] font-normal">.hub</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              className={`transition-colors hover:text-[#34D399] ${
                pathname === link.href ? "text-[#34D399]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/locator"
            prefetch
            className="flex items-center gap-2 rounded-full border border-[#2E3A4E] bg-[#172033]/60 px-4 py-2 text-xs font-semibold text-[#34D399] hover:bg-[#172033] hover:border-[#059669] transition-all duration-300"
          >
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Find a Charger</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
