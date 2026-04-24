import type { CycleMeta } from "@/lib/document-cycle-types";

export function VisualCycleDetail({ meta }: { meta: CycleMeta }) {
  return (
    <div className="mt-8 space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-sm">
      <section>
        <h3 className="mb-2 text-base font-semibold text-white">نظرة عامة</h3>
        <p className="leading-relaxed text-zinc-400">{meta.overview}</p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-white">أهداف الدورة</h3>
        <ul className="list-inside list-disc space-y-1 text-zinc-400">
          {meta.goals.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-amber-200">تحذيرات شائعة</h3>
        <ul className="list-inside list-disc space-y-1 text-zinc-400">
          {meta.warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-accent">مثال عملي</h3>
        <p className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-4 leading-relaxed text-zinc-300">{meta.example}</p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-rose-200">أخطاء شائعة</h3>
        <ul className="list-inside list-disc space-y-1 text-zinc-400">
          {meta.commonMistakes.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-zinc-200">ملاحظات على القيود</h3>
        <p className="leading-relaxed text-zinc-500">{meta.journalNotes}</p>
      </section>
    </div>
  );
}
