import { FinancialPlayground } from "@/components/FinancialPlayground";

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">المحاكاة المالية</h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
        محاكاة <strong className="text-zinc-300">إيراد نشاطين</strong> (حفر وتجارة)،{" "}
        <strong className="text-zinc-300">تكلفة مباشرة</strong> كنسب من الإيراد، و
        <strong className="text-zinc-300">مصاريف تشغيلية</strong> شهرية، مع{" "}
        <strong className="text-zinc-300">موقف ضريبي تبسيطي</strong>. العملة: ريال سعودي.
      </p>
      <div className="mt-10">
        <FinancialPlayground />
      </div>
    </div>
  );
}
