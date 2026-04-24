import Link from "next/link";
import { DOCS_INDEX } from "@/lib/docs-index";
import { DocsSearch } from "@/components/DocsSearch";

export default function DocsPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-white">الدليل المحاسبي</h1>
        <p className="text-zinc-400">
          وثائق تفصيلية لجميع الجوانب المحاسبية — اقرأ داخل الموقع، وابحث سريعاً، واطبع عند الحاجة (Ctrl+P).
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">بحث في الفهرس</h2>
        <DocsSearch docs={DOCS_INDEX} />
      </div>

      <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">المستندات المتاحة</h2>
        <div className="space-y-4">
          {DOCS_INDEX.map((doc) => (
            <div
              key={doc.id}
              className="rounded-xl border border-zinc-700 bg-zinc-800/60 p-5 transition hover:border-zinc-600"
            >
              <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {doc.tags.map((tag) => (
                    <span key={tag} className="rounded bg-accent/15 px-2 py-0.5 text-xs text-accent">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-zinc-400">{doc.description}</p>
              <Link
                href={`/docs/${doc.id}`}
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                فتح المستند والقراءة كاملة
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">كيفية استخدام الدليل</h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <div className="border-b border-zinc-800 pb-3">
            <strong className="text-zinc-300">للمبتدئين:</strong> ابدأ بـ «معجم المصطلحات» ثم «دليل الحسابات» ثم «دورة المحاسبة الشهرية».
          </div>
          <div className="border-b border-zinc-800 pb-3">
            <strong className="text-zinc-300">لشركات المشاريع:</strong> راجع «تكلفة الوظائف» و«ربحية المشاريع» في البوابة مع المستند.
          </div>
          <div className="border-b border-zinc-800 pb-3">
            <strong className="text-zinc-300">للامتثال الضريبي:</strong> «الضرائب والامتثال» وصفحة الامتثال في البوابة — مع مراجعة مختص.
          </div>
          <div>
            <strong className="text-zinc-300">للمدير:</strong> «دليل المستخدم» و«الأسئلة الشائعة» ثم اللوحة التنفيذية.
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">ملاحظة مهمة</h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          هذه المستندات للإرشاد العام داخل البوابة — <strong className="text-zinc-300">لا تحل محل استشارة محاسب أو مستشار ضريبي معتمد</strong>.
          لكل شركة ظروف خاصة، واللوائح تتغير؛ راجع فريقكم قبل القرارات الجوهرية.
        </p>
      </div>
    </div>
  );
}
