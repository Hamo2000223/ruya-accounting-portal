"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { DocIndexItem } from "@/lib/docs-index";

type Props = {
  docs: DocIndexItem[];
};

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const q = query.trim();
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  const before = text.slice(0, i);
  const match = text.slice(i, i + q.length);
  const after = text.slice(i + q.length);
  return (
    <>
      {before}
      <mark className="rounded bg-accent/30 px-0.5 text-accent">{match}</mark>
      {after}
    </>
  );
}

export function DocsSearch({ docs }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return docs;
    return docs.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [docs, query]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    },
    [],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-right text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200 sm:max-w-md"
          aria-label="فتح البحث في الدليل"
        >
          <span>بحث في المستندات…</span>
          <kbd className="hidden rounded border border-zinc-600 bg-zinc-900 px-2 py-0.5 font-mono text-xs text-zinc-500 sm:inline">Ctrl+K</kbd>
        </button>
        <p className="text-xs text-zinc-500">يمكنك أيضاً استخدام Ctrl+F داخل الصفحة للبحث في النص الظاهر.</p>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 p-4 pt-[12vh] sm:pt-[15vh]"
          role="dialog"
          aria-modal="true"
          aria-label="بحث الدليل"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[70vh] w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-zinc-800 p-3">
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="اكتب للبحث في العناوين والأوصاف والوسوم…"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                aria-label="نص البحث"
              />
            </div>
            <ul className="max-h-[55vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-zinc-500">لا توجد نتائج</li>
              ) : (
                filtered.map((doc) => (
                  <li key={doc.id}>
                    <Link
                      href={`/docs/${doc.id}`}
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                      }}
                      className="block rounded-lg px-3 py-3 text-right transition hover:bg-zinc-800"
                    >
                      <span className="block font-medium text-white">{highlight(doc.title, query)}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-zinc-500">
                        {highlight(doc.description, query)}
                      </span>
                      <span className="mt-2 flex flex-wrap gap-1">
                        {doc.tags.map((t) => (
                          <span key={t} className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
                            {highlight(t, query)}
                          </span>
                        ))}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
            <div className="border-t border-zinc-800 px-3 py-2 text-center text-[11px] text-zinc-600">
              Esc للإغلاق · Enter يفتح أول نتيجة من القائمة يدوياً
            </div>
          </div>
        </div>
      )}
    </>
  );
}
