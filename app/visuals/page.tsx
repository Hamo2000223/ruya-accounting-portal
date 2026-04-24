import Link from "next/link";
import { VisualsCyclesClient } from "@/components/VisualsCyclesClient";

export default function VisualsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-4 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          الرئيسية
        </Link>
        <span className="mx-2 text-zinc-600">/</span>
        <span className="text-zinc-300">دورة المستندات</span>
      </nav>
      <h1 className="text-2xl font-bold text-white sm:text-3xl">دورة المستندات — الضبط الداخلي</h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
        قبل ترحيل <strong className="text-zinc-300">الذمم</strong> أو <strong className="text-zinc-300">المخزون</strong> أو{" "}
        <strong className="text-zinc-300">الإيراد</strong>، يجب اكتمال سلسلة المستندات حسب سياسة الشركة. اختر دورة من التبويبات، ثم{" "}
        <strong className="text-zinc-300">انقر على أي خطوة</strong> في المخطط لعرض المستندات والقيد والمسؤول وأفضل الممارسات.
      </p>

      <div className="mt-10">
        <VisualsCyclesClient />
      </div>
    </div>
  );
}
