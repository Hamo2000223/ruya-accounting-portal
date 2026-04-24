import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ALLOWED_SUBJECT_SLUGS, SUBJECTS, getSubject } from "@/lib/subjects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SUBJECTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) return { title: "مادة غير موجودة" };
  return {
    title: `${subject.title} — ثانوي أدبي`,
    description: subject.shortDescription,
  };
}

export default async function SubjectPage({ params }: Props) {
  const { slug } = await params;

  if (!ALLOWED_SUBJECT_SLUGS.has(slug)) {
    notFound();
  }

  const subject = getSubject(slug)!;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-8 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          الرئيسية
        </Link>
        <span className="mx-2 text-zinc-600">/</span>
        <span className="text-zinc-300">{subject.title}</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-medium text-accent">ثانوي عام — قسم أدبي (مصر)</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{subject.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{subject.shortDescription}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {subject.tags.map((t) => (
            <span key={t} className="rounded-full bg-accent/15 px-3 py-1 text-xs text-accent">
              {t}
            </span>
          ))}
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-200">وحدات وموضوعات مرجعية</h2>
        <p className="mt-2 text-sm text-zinc-500">
          قائمة عامة للمراجعة؛ راجع معلمك والمنهج المعتمد في مدرستك للتفاصيل الدقيقة.
        </p>
        <ul className="mt-5 space-y-3">
          {subject.units.map((u) => (
            <li
              key={u}
              className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-300"
            >
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {u}
            </li>
          ))}
        </ul>
      </section>

      <div className="rounded-2xl border border-zinc-800 bg-surface-raised/50 p-6">
        <h2 className="text-lg font-semibold text-white">دليل المراجعة الكامل</h2>
        <p className="mt-2 text-sm text-zinc-400">
          مقال مرتبط بهذه المادة في قسم الدليل — شرح أطول ونصائح للمذاكرة.
        </p>
        <Link
          href={`/docs/${subject.reviewDocId}`}
          className="mt-4 inline-flex rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-accent/90"
        >
          فتح: مراجعة {subject.title}
        </Link>
        <Link
          href="/docs"
          className="mr-3 inline-flex rounded-xl border border-zinc-600 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-500"
        >
          كل المستندات
        </Link>
      </div>
    </div>
  );
}
