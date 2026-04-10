"use client";

import { useState } from "react";
import { ExternalInsights } from "./ExternalInsights";
import { InternalInsights } from "./InternalInsights";
import { OpexBreakdown } from "./OpexBreakdown";
import { ReportingBridge } from "./ReportingBridge";
import { SliderField } from "./SliderField";
import { useAccountingDemoState } from "@/lib/useAccountingDemoState";

const TABS = [
  { id: "external", label: "الخارجي", desc: "ذمم مدينة، إيراد، ضريبة" },
  { id: "internal", label: "الداخلي", desc: "موردون، مخزون، أعمال تحت التنفيذ" },
  { id: "opex", label: "المصاريف", desc: "توزيع حسب البند" },
  { id: "reports", label: "التقارير", desc: "جسر ربحية" },
] as const;

export function AccountingInsightsHub() {
  const s = useAccountingDemoState();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("external");

  return (
    <div className="space-y-8">
      <p className="text-sm text-zinc-500">
        حالة واحدة للمحاكاة عبر كل التبويبات — غيّر المنزلقات في أي قسم وستنعكس في الجسر والملخصات.
      </p>

      <details className="rounded-xl border border-zinc-800 bg-surface-raised/40 p-4 open:bg-surface-overlay/60">
        <summary className="cursor-pointer text-sm font-semibold text-zinc-200">
          افتراضات الإيراد والتكلفة المباشرة (شهري)
        </summary>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <SliderField label="إيراد حفر — الشهر الأول" value={s.drillingM1} onChange={s.setDrillingM1} min={0} max={5_000_000} step={50_000} />
          <SliderField label="نمو شهري إيراد الحفر (٪)" value={s.drillingGrowth} onChange={s.setDrillingGrowth} min={-5} max={8} step={0.5} format="percent" />
          <SliderField label="إيراد تجارة — الشهر الأول" value={s.productM1} onChange={s.setProductM1} min={0} max={2_000_000} step={25_000} />
          <SliderField label="نمو شهري إيراد التجارة (٪)" value={s.productGrowth} onChange={s.setProductGrowth} min={-5} max={10} step={0.5} format="percent" />
          <SliderField label="تكلفة مباشرة حفر من إيراد الحفر (٪)" value={s.drillingDirectPct} onChange={s.setDrillingDirectPct} min={30} max={85} step={1} format="percent" />
          <SliderField label="تكلفة بضاعة من إيراد التجارة (٪)" value={s.productCogsPct} onChange={s.setProductCogsPct} min={40} max={95} step={1} format="percent" />
        </div>
      </details>

      <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-t-lg px-4 py-2.5 text-sm font-medium transition ${
              tab === t.id
                ? "bg-accent/20 text-accent ring-1 ring-accent/40"
                : "text-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-200"
            }`}
          >
            <span className="block">{t.label}</span>
            <span className="mt-0.5 block text-[11px] font-normal text-zinc-500">{t.desc}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[320px]">
        {tab === "external" && <ExternalInsights s={s} />}
        {tab === "internal" && <InternalInsights s={s} />}
        {tab === "opex" && <OpexBreakdown s={s} />}
        {tab === "reports" && <ReportingBridge s={s} />}
      </div>
    </div>
  );
}
