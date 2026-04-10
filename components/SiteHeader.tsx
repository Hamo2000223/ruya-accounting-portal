"use client";

import Link from "next/link";
import { useState } from "react";

const reportsMenu = [
  { href: "/executive", label: "لوحة تنفيذية" },
  { href: "/ruya", label: "لوحة الرؤى" },
  { href: "/cashflow", label: "التدفق النقدي" },
  { href: "/ratios", label: "النسب المالية" },
  { href: "/budget", label: "الموازنة مقابل الفعلي" },
  { href: "/projects", label: "ربحية المشاريع" },
  { href: "/compliance", label: "الامتثال" },
  { href: "/forecast", label: "التوقعات" },
];

const otherLinks = [
  { href: "/playground", label: "المحاكاة" },
  { href: "/visuals", label: "دورة المستندات" },
  { href: "/docs", label: "الدليل" },
];

export function SiteHeader() {
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-surface/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-100 transition hover:text-accent"
        >
          رؤى محاسبية
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="التنقل">
          {/* Reports Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsReportsOpen(!isReportsOpen)}
              onBlur={() => setTimeout(() => setIsReportsOpen(false), 200)}
              className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800/80 hover:text-zinc-100 flex items-center gap-1"
            >
              التقارير
              <svg className={`w-4 h-4 transition-transform ${isReportsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isReportsOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50">
                {reportsMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other Links */}
          {otherLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800/80 hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
