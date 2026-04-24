import Link from "next/link";

const sections = [
  {
    title: "لوحة الرؤى المحاسبية",
    body: "رؤى تفاعلية للجانب الخارجي (ذمم، إيراد، ضريبة)، الداخلي (موردون، مخزون، أعمال تحت التنفيذ)، المصاريف التشغيلية، وجسر الربحية.",
    href: "/ruya",
  },
  {
    title: "المحاكاة المالية",
    body: "منزلقات وأرقام افتراضية لاختبار سيناريوهات الإيراد والتكلفة على ١٢ شهراً، مع موقف ضريبي تبسيطي — للنقاش مع الإدارة.",
    href: "/playground",
  },
  {
    title: "دورة المستندات",
    body: "مخطط توضيحي: أمر شراء ← استلام ← فاتورة مورد (الثلاثية قبل الترحيل). مفيد للتدريب والضبط الداخلي.",
    href: "/visuals",
  },
  {
    title: "الدليل المحاسبي",
    body: "مرجع مختصر: التصميم المحاسبي، الدليل المالي والتدفقات، والامتثال السعودي (زكاة، فوترة، عمالة، منافسات).",
    href: "/docs",
  },
];

export default function Home() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-accent/40 to-transparent" />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <p className="text-sm font-medium text-accent">للعميل — جاهز للعرض</p>
        <h1 className="mt-3 max-w-3xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          رؤى محاسبية شاملة ومبسّطة
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          أربع وحدات تغطي الجانب المحاسبي بالكامل: <strong className="text-zinc-300">رؤى تفاعلية</strong>،{" "}
          <strong className="text-zinc-300">محاكاة مالية</strong>، <strong className="text-zinc-300">دورة المستندات</strong>، و
          <strong className="text-zinc-300">دليل مرجعي</strong> — كلها بالعربية مع تصميم عصري.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/ruya"
            className="inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-zinc-950 shadow-glow transition hover:bg-accent/90"
          >
            ابدأ من لوحة الرؤى
          </Link>
          <Link
            href="/playground"
            className="inline-flex rounded-xl border border-zinc-600 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-500"
          >
            جرّب المحاكاة
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <h2 className="text-lg font-semibold text-zinc-200">الوحدات الأربع</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {sections.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group rounded-2xl border border-zinc-800/90 bg-surface-raised/60 p-6 shadow-glow transition hover:border-cyan-500/30 hover:bg-surface-overlay/80"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-accent">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.body}</p>
              <span className="mt-4 inline-block text-sm text-accent">استكشف ←</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
