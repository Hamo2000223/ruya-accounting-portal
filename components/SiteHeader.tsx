"use client";

import Link from "next/link";
import { SUBJECTS } from "@/lib/subjects";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-surface/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold text-zinc-100 transition hover:text-accent">
          ثانوي أدبي — مراجعة المواد
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2" aria-label="التنقل">
          {SUBJECTS.map((s) => (
            <Link
              key={s.slug}
              href={`/subjects/${s.slug}`}
              className="rounded-lg px-2 py-2 text-xs text-zinc-400 transition hover:bg-zinc-800/80 hover:text-zinc-100 sm:px-3 sm:text-sm"
            >
              {s.title}
            </Link>
          ))}
          <Link
            href="/docs"
            className="rounded-lg px-2 py-2 text-xs font-medium text-accent transition hover:bg-zinc-800/80 sm:px-3 sm:text-sm"
          >
            الدليل
          </Link>
        </nav>
      </div>
    </header>
  );
}
