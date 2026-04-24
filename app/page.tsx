import Link from "next/link";
import { SUBJECTS } from "@/lib/subjects";

export default function Home() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-accent/40 to-transparent" />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <p className="text-sm font-medium text-accent">ثانوي عام — قسم أدبي · مرجع دراسي</p>
        <h1 className="mt-3 max-w-3xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          مراجعة المواد الأدبية في مكان واحد
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          موقع مبسّط بالعربية لطلاب الثانوية الأدبية في مصر:{" "}
          <strong className="text-zinc-300">ست مواد</strong> مع صفحات تمهيدية، وحدات مرجعية، ومقالات
          في الدليل للمراجعة — المحتوى عام ولا يغني عن المنهج الرسمي أو شرح المدرس.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-zinc-950 shadow-glow transition hover:bg-accent/90"
          >
            انتقل إلى الدليل
          </Link>
          <Link
            href="/subjects/arabic"
            className="inline-flex rounded-xl border border-zinc-600 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-500"
          >
            ابدأ من العربي
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <h2 className="text-lg font-semibold text-zinc-200">المواد الست</h2>
        <p className="mt-2 text-sm text-zinc-500">اختر المادة للاطلاع على الوحدات المرجعية والمقال المرتبط.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((s) => (
            <Link
              key={s.slug}
              href={`/subjects/${s.slug}`}
              className="group rounded-2xl border border-zinc-800/90 bg-surface-raised/60 p-6 shadow-glow transition hover:border-cyan-500/30 hover:bg-surface-overlay/80"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-accent">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.shortDescription}</p>
              <span className="mt-4 inline-block text-sm text-accent">صفحة المادة ←</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
