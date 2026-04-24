"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatSAR } from "@/lib/format-sar";
import { SliderField } from "./SliderField";
import { useAccountingDemoState } from "@/lib/useAccountingDemoState";

export function FinancialPlayground() {
  const s = useAccountingDemoState();

  const cumulative = useMemo(() => {
    let sum = 0;
    return s.rows.map((r) => {
      sum += r.ebitda;
      return { month: r.month, cumulativeEBITDA: sum };
    });
  }, [s.rows]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 text-sm leading-relaxed text-amber-100/90">
        <strong className="text-amber-200">تنبيه محاسبي:</strong> محاكاة للنقاش — إيراد مركّب، تكاليف كنسب من الإيراد،
        مصاريف تشغيلية شهرية ثابتة. لا تعكس استقطاعات حكومية أو منع تصرف. لا يغني عن إقفال شهر أو مراجعة ضريبية.
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SliderField label="إيراد نشاط الحفر — الشهر الأول (ر.س)" value={s.drillingM1} onChange={s.setDrillingM1} min={0} max={5_000_000} step={50_000} />
        <SliderField label="نمو شهري لإيراد الحفر (٪)" value={s.drillingGrowth} onChange={s.setDrillingGrowth} min={-5} max={8} step={0.5} format="percent" />
        <SliderField label="إيراد نشاط التجارة — الشهر الأول (ر.س)" value={s.productM1} onChange={s.setProductM1} min={0} max={2_000_000} step={25_000} />
        <SliderField label="نمو شهري لإيراد التجارة (٪)" value={s.productGrowth} onChange={s.setProductGrowth} min={-5} max={10} step={0.5} format="percent" />
        <SliderField label="تكلفة مباشرة حفر من إيراد الحفر (٪)" value={s.drillingDirectPct} onChange={s.setDrillingDirectPct} min={30} max={85} step={1} format="percent" />
        <SliderField label="تكلفة بضاعة من إيراد التجارة (٪)" value={s.productCogsPct} onChange={s.setProductCogsPct} min={40} max={95} step={1} format="percent" />
        <SliderField label="مصاريف تشغيلية شهرية (ر.س)" value={s.opexMonthly} onChange={s.setOpexMonthly} min={50_000} max={3_000_000} step={25_000} />
      </div>

      <div className="rounded-2xl border border-zinc-700 bg-surface-raised/50 p-4">
        <h3 className="text-sm font-semibold text-zinc-200">موقف ضريبي تبسيطي (شهر ١٢ — تقدير فقط)</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SliderField label="معدل الضريبة (٪)" value={s.vatRate} onChange={s.setVatRate} min={0} max={15} step={1} format="percent" />
          <SliderField label="مشتريات شهرية (أساس مدخلات)" value={s.monthlyPurchases} onChange={s.setMonthlyPurchases} min={50_000} max={4_000_000} step={25_000} />
          <SliderField label="استرداد مدخلات تقديري (٪)" value={s.vatRecoveryPct} onChange={s.setVatRecoveryPct} min={0} max={100} step={5} format="percent" />
        </div>
        <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
          <input
            type="checkbox"
            checked={s.vatOnTradeOnly}
            onChange={(e) => s.setVatOnTradeOnly(e.target.checked)}
            className="size-4 rounded border-zinc-600 accent-accent"
          />
          المخرجات على إيراد التجارة فقط
        </label>
        <div className="mt-4 grid gap-2 border-t border-zinc-800 pt-4 text-sm sm:grid-cols-2">
          <p className="text-zinc-500">
            قاعدة مخرجات: <span className="font-mono text-zinc-200">{formatSAR(s.taxableSales)}</span>
          </p>
          <p className="text-zinc-500">
            مخرجات ≈ <span className="font-mono text-accent">{formatSAR(s.vatOutput)}</span>
          </p>
          <p className="text-zinc-500">
            مدخلات مستردة ≈ <span className="font-mono text-indigo-300">{formatSAR(s.vatInput)}</span>
          </p>
          <p className="text-zinc-500">
            صافي موقف ≈ <span className="font-mono text-amber-200">{formatSAR(s.netVatPosition)}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">الإيراد الشهري حسب النشاط</h3>
          <div className="h-72 w-full min-w-0" dir="ltr">
            <ResponsiveContainer width="100%" height={288}>
              <BarChart data={s.rows}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="month" stroke="#a1a1aa" fontSize={11} interval={0} angle={-35} textAnchor="end" height={56} />
                <YAxis stroke="#a1a1aa" fontSize={11} tickFormatter={(v) => `${(Number(v) / 1000).toFixed(0)} ألف`} />
                <Tooltip formatter={(v) => formatSAR(Number(v))} contentStyle={{ background: "#18181b", border: "1px solid #3f3f46" }} labelStyle={{ direction: "rtl" }} />
                <Legend wrapperStyle={{ direction: "rtl" }} />
                <Bar dataKey="drilling" name="خدمات الحفر" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                <Bar dataKey="product" name="نشاط التجارة" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">الهامش الإجمالي والربح التشغيلي</h3>
          <div className="h-72 w-full min-w-0" dir="ltr">
            <ResponsiveContainer width="100%" height={288}>
              <LineChart data={s.rows}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="month" stroke="#a1a1aa" fontSize={11} interval={0} angle={-35} textAnchor="end" height={56} />
                <YAxis stroke="#a1a1aa" fontSize={11} tickFormatter={(v) => `${(Number(v) / 1000).toFixed(0)} ألف`} />
                <Tooltip formatter={(v) => formatSAR(Number(v))} contentStyle={{ background: "#18181b", border: "1px solid #3f3f46" }} />
                <Legend wrapperStyle={{ direction: "rtl" }} />
                <Line type="monotone" dataKey="gross" name="الهامش الإجمالي" stroke="#fbbf24" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ebitda" name="ربح تشغيلي تقريبي" stroke="#f472b6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4">
        <h3 className="mb-4 text-sm font-semibold text-zinc-200">تراكم الربح التشغيلي (١٢ شهراً)</h3>
        <div className="h-64 w-full min-w-0" dir="ltr">
          <ResponsiveContainer width="100%" height={256}>
            <LineChart data={cumulative}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="month" stroke="#a1a1aa" fontSize={11} interval={0} angle={-35} textAnchor="end" height={56} />
              <YAxis stroke="#a1a1aa" fontSize={11} tickFormatter={(v) => formatSAR(Number(v))} />
              <Tooltip formatter={(v) => formatSAR(Number(v))} contentStyle={{ background: "#18181b", border: "1px solid #3f3f46" }} />
              <Legend wrapperStyle={{ direction: "rtl" }} />
              <Line type="monotone" dataKey="cumulativeEBITDA" name="التراكم" stroke="#34d399" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
