"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Legend } from "recharts";
import { formatSAR } from "@/lib/format-sar";
import { SliderField } from "./SliderField";
import type { AccountingDemoState } from "@/lib/useAccountingDemoState";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";

const COLORS = ["#22d3ee", "#6366f1", "#fbbf24", "#f472b6"];

type Props = { s: AccountingDemoState };

export function ExternalInsights({ s }: Props) {
  // Revenue by segment (mock distribution)
  const revenueBySegment = [
    { name: "حكومي", value: Math.round(s.last.revenue * 0.65) },
    { name: "خاص", value: Math.round(s.last.revenue * 0.25) },
    { name: "مختلط", value: Math.round(s.last.revenue * 0.1) },
  ];

  // Collection health (0-60 days as % of total)
  const goodAR = s.arAging.slice(0, 2).reduce((sum, b) => sum + b.value, 0);
  const collectionHealthPct = s.arTotal > 0 ? (goodAR / s.arTotal) * 100 : 0;

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-zinc-400">
        <strong className="text-zinc-300">الجانب الخارجي:</strong> عملاء، ذمم مدينة، وإيراد — مع ضريبة مخرجات تقديرية.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SliderField
          label="أيام التحصيل التقريبية من العملاء"
          value={s.dso}
          onChange={s.setDso}
          min={30}
          max={150}
          step={5}
          format="raw"
          suffix=" يوم"
        />
        <SliderField label="معدل ضريبة المخرجات (٪)" value={s.vatRate} onChange={s.setVatRate} min={0} max={15} step={1} format="percent" />
        <SliderField label="مشتريات شهرية (أساس مدخلات)" value={s.monthlyPurchases} onChange={s.setMonthlyPurchases} min={50_000} max={4_000_000} step={25_000} />
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
        <input
          type="checkbox"
          checked={s.vatOnTradeOnly}
          onChange={(e) => s.setVatOnTradeOnly(e.target.checked)}
          className="size-4 rounded border-zinc-600 accent-accent"
        />
        المخرجات على إيراد التجارة فقط
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-surface-raised/60 p-4">
          <p className="text-xs text-zinc-500">إيراد حفر (شهر ١٢)</p>
          <p className="mt-1 text-lg font-semibold text-accent">{formatSAR(s.last.drilling)}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-surface-raised/60 p-4">
          <p className="text-xs text-zinc-500">إيراد تجارة (شهر ١٢)</p>
          <p className="mt-1 text-lg font-semibold text-indigo-300">{formatSAR(s.last.product)}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-surface-raised/60 p-4">
          <p className="text-xs text-zinc-500">ذمم مدينة تقديرية</p>
          <p className="mt-1 text-lg font-semibold text-amber-200">{formatSAR(s.arTotal)}</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4">
        <h3 className="mb-3 text-sm font-semibold text-zinc-200">أهم ٥ عملاء حسب الرصيد</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="pb-2 pr-2 text-right font-medium">اسم العميل</th>
                <th className="pb-2 pr-2 text-right font-medium">رصيد ذمة</th>
                <th className="pb-2 pr-2 text-right font-medium">أيام تأخير</th>
                <th className="pb-2 pr-2 text-right font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CUSTOMERS.map((c) => (
                <tr key={c.id} className="border-b border-zinc-800/50 last:border-0">
                  <td className="py-2 pr-2 text-zinc-300">{c.name}</td>
                  <td className="py-2 pr-2 font-mono text-zinc-200">{formatSAR(c.arBalance)}</td>
                  <td className="py-2 pr-2 font-mono text-zinc-400">{c.daysOverdue}</td>
                  <td className="py-2 pr-2">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs ${
                        c.status === "good"
                          ? "bg-green-900/40 text-green-300"
                          : c.status === "watch"
                            ? "bg-yellow-900/40 text-yellow-300"
                            : "bg-red-900/40 text-red-300"
                      }`}
                    >
                      {c.status === "good" ? "جيد" : c.status === "watch" ? "متابعة" : "حرج"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* AR Aging Chart */}
        <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4">
          <h3 className="mb-2 text-sm font-semibold text-zinc-200">توزيع أعمار الذمم</h3>
          <p className="mb-4 text-xs text-zinc-500">يتحرك مع أيام التحصيل</p>
          <div className="h-56 w-full min-w-0" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={s.arAging} layout="vertical" margin={{ left: 8, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis type="number" stroke="#a1a1aa" fontSize={10} tickFormatter={(v) => formatSAR(Number(v))} />
                <YAxis type="category" dataKey="name" stroke="#a1a1aa" fontSize={10} width={75} />
                <Tooltip
                  formatter={(v) => formatSAR(Number(v ?? 0))}
                  contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "0.5rem" }}
                />
                <Bar dataKey="value" name="المبلغ" radius={[0, 4, 4, 0]}>
                  {s.arAging.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Segment */}
        <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4">
          <h3 className="mb-2 text-sm font-semibold text-zinc-200">توزيع الإيراد حسب نوع العميل</h3>
          <p className="mb-4 text-xs text-zinc-500">نسبة تقديرية</p>
          <div className="h-56 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueBySegment}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label={(entry) => `${((entry.value / s.last.revenue) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {revenueBySegment.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => formatSAR(Number(v))}
                  contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "0.5rem" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#a1a1aa" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Collection Health */}
        <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4 flex flex-col justify-center">
          <h3 className="mb-3 text-sm font-semibold text-zinc-200">مؤشر صحة التحصيل</h3>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-2">{collectionHealthPct.toFixed(1)}%</p>
            <p className="text-xs text-zinc-400">نسبة الذمم الجيدة (0–60 يوماً)</p>
            <div className="mt-4">
              <span
                className={`inline-block rounded px-3 py-1 text-sm ${
                  collectionHealthPct >= 70
                    ? "bg-green-900/40 text-green-300"
                    : collectionHealthPct >= 50
                      ? "bg-yellow-900/40 text-yellow-300"
                      : "bg-red-900/40 text-red-300"
                }`}
              >
                {collectionHealthPct >= 70 ? "صحة ممتازة" : collectionHealthPct >= 50 ? "صحة متوسطة" : "يحتاج متابعة"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* VAT Position */}
      <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4">
        <h3 className="mb-3 text-sm font-semibold text-zinc-200">موقف ضريبي تقديري</h3>
        <ul className="space-y-3 text-sm text-zinc-400">
          <li className="flex justify-between gap-4 border-b border-zinc-800 pb-2">
            <span>قاعدة المخرجات (إيراد خاضع)</span>
            <span className="font-mono text-zinc-200">{formatSAR(s.taxableSales)}</span>
          </li>
          <li className="flex justify-between gap-4 border-b border-zinc-800 pb-2">
            <span>ضريبة مخرجات تقريبية</span>
            <span className="font-mono text-accent">{formatSAR(s.vatOutput)}</span>
          </li>
          <li className="flex justify-between gap-4 border-b border-zinc-800 pb-2">
            <span>ضريبة مدخلات مستردة (تقدير)</span>
            <span className="font-mono text-indigo-300">−{formatSAR(s.vatInput)}</span>
          </li>
          <li className="flex justify-between gap-4 pt-1">
            <span className="font-medium text-zinc-200">صافي الموقف (تقريبي)</span>
            <span className="font-mono font-semibold text-amber-200">{formatSAR(s.netVatPosition)}</span>
          </li>
        </ul>
        <p className="mt-4 text-xs text-zinc-500">
          <strong className="text-zinc-400">تنبيه:</strong> التخصيص الفعلي يعتمد على نوع العقد والاستشاري الضريبي.
        </p>
      </div>
    </div>
  );
}
