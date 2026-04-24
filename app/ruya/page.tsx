import Link from "next/link";
import { AccountingInsightsHub } from "@/components/AccountingInsightsHub";

export default function RuyaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-4 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          الرئيسية
        </Link>
        <span className="mx-2 text-zinc-600">/</span>
        <span className="text-zinc-300">لوحة الرؤى</span>
      </nav>
      <h1 className="text-2xl font-bold text-white sm:text-3xl">لوحة الرؤى المحاسبية</h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
        رؤى توضيحية للجانب الخارجي والداخلي والمصاريف وجسر الربحية — للمناقشة مع الإدارة. ليست قيوداً في دفتر أستاذ.
      </p>
      <div className="mt-10">
        <AccountingInsightsHub />
      </div>
    </div>
  );
}
