"use client";

import type { CycleStepDetail } from "@/lib/document-cycle-types";

type Props = {
  open: boolean;
  onClose: () => void;
  detail: CycleStepDetail | null;
};

export function CycleStepModal({ open, onClose, detail }: Props) {
  if (!open || !detail) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cycle-step-title"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="cycle-step-title" className="text-lg font-bold text-white">
            {detail.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg px-2 py-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-zinc-300">{detail.description}</p>

        <div className="space-y-4 text-sm">
          <div>
            <h3 className="mb-2 font-semibold text-accent">المستندات المطلوبة</h3>
            <ul className="list-inside list-disc space-y-1 text-zinc-400">
              {detail.documents.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-indigo-300">القيد المحاسبي (إن وُجد)</h3>
            <pre className="whitespace-pre-wrap rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-300">
              {detail.journalEntry}
            </pre>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-teal-300">المسؤول</h3>
            <p className="text-zinc-400">{detail.responsible}</p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-amber-200">أفضل الممارسات</h3>
            <p className="text-zinc-400">{detail.bestPractices}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
