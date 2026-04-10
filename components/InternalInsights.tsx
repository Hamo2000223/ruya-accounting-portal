"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatSAR } from "@/lib/format-sar";
import { SliderField } from "./SliderField";
import type { AccountingDemoState } from "@/lib/useAccountingDemoState";
import { MOCK_VENDORS, MOCK_PROJECTS } from "@/lib/mock-data";

type Props = { s: AccountingDemoState };

export function InternalInsights({ s }: Props) {
  const balanceData = [
    {
      name: "تقدير",
      assets: Math.round(s.currentAssets),
      liabilities: Math.round(s.currentLiabilities),
    },
  ];

  // Inventory turnover chart (current vs target)
  const inventoryTurnoverData = [
    { name: "أيام حالية", value: s.inventoryDays },
    { name: "مستهدف", value: 45 },
  ];

  // Active projects stats
  const activeProjects = MOCK_PROJECTS.filter((p) => p.status === "active");
  const avgCompletion = activeProjects.length > 0 
    ? activeProjects.reduce((sum, p) => sum + p.percentComplete, 0) / activeProjects.length 
    : 0;
  const totalWipCost = activeProjects.reduce((sum, p) => sum + p.cost, 0);

  // Efficiency indicator (actual cost vs planned) - mock ratio
  const efficiencyRatio = 0.92; // 92% efficient (actual is 92% of planned)

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-zinc-400">
        <strong className="text-zinc-300">الجانب الداخلي:</strong> موردون، مخزون، أعمال تحت التنفيذ. الأرقام <strong className="text-zinc-300">نموذجية</strong> للعرض.
      </p>

      <div className="rounded-lg border border-teal-900/40 bg-teal-950/20 p-4 text-sm text-teal-100/90">
        سلسلة المستندات: <span className="text-teal-300">أمر شراء</span>، ثم{" "}
        <span className="text-teal-300">سند استلام</span>، ثم <span className="text-teal-300">فاتورة مورد</span> — قبل ترحيل الذمة أو المخزون.
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SliderField
          label="أيام آجال الدفع للموردين (تقريباً)"
          value={s.dpo}
          onChange={s.setDpo}
          min={15}
          max={120}
          step={5}
          format="raw"
          suffix=" يوم"
        />
        <SliderField label="أيام تغطية مخزون التجارة" value={s.inventoryDays} onChange={s.setInventoryDays} min={15} max={120} step={5} format="raw" suffix=" يوم" />
        <SliderField label="مقياس أعمال تحت التنفيذ (حفر)" value={s.wipScale} onChange={s.setWipScale} min={10} max={100} step={5} format="percent" />
        <SliderField label="رصيد نقدي تقديري" value={s.cashBuffer} onChange={s.setCashBuffer} min={0} max={5_000_000} step={50_000} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-surface-raised/60 p-3">
          <p className="text-xs text-zinc-500">ذمم دائنة تقديرية</p>
          <p className="mt-1 font-semibold text-rose-300/90">{formatSAR(s.apEstimated)}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-surface-raised/60 p-3">
          <p className="text-xs text-zinc-500">مخزون تجارة تقديري</p>
          <p className="mt-1 font-semibold text-amber-200/90">{formatSAR(s.inventoryEstimated)}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-surface-raised/60 p-3">
          <p className="text-xs text-zinc-500">أعمال تحت التنفيذ تقديرية</p>
          <p className="mt-1 font-semibold text-accent">{formatSAR(s.wipEstimated)}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-surface-raised/60 p-3">
          <p className="text-xs text-zinc-500">ذمم مدينة (مرجع)</p>
          <p className="mt-1 font-semibold text-zinc-200">{formatSAR(s.arTotal)}</p>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4">
        <h3 className="mb-3 text-sm font-semibold text-zinc-200">أهم ٥ موردين حسب الرصيد</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="pb-2 pr-2 text-right font-medium">اسم المورد</th>
                <th className="pb-2 pr-2 text-right font-medium">رصيد ذمة دائنة</th>
                <th className="pb-2 pr-2 text-right font-medium">آجال متوسطة</th>
                <th className="pb-2 pr-2 text-right font-medium">حالة العلاقة</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_VENDORS.map((v) => (
                <tr key={v.id} className="border-b border-zinc-800/50 last:border-0">
                  <td className="py-2 pr-2 text-zinc-300">{v.name}</td>
                  <td className="py-2 pr-2 font-mono text-zinc-200">{formatSAR(v.apBalance)}</td>
                  <td className="py-2 pr-2 font-mono text-zinc-400">{v.avgDpo} يوماً</td>
                  <td className="py-2 pr-2">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs ${
                        v.relationship === "excellent"
                          ? "bg-green-900/40 text-green-300"
                          : v.relationship === "good"
                            ? "bg-blue-900/40 text-blue-300"
                            : "bg-yellow-900/40 text-yellow-300"
                      }`}
                    >
                      {v.relationship === "excellent" ? "ممتاز" : v.relationship === "good" ? "جيد" : "عادي"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Inventory Turnover */}
        <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4">
          <h3 className="mb-2 text-sm font-semibold text-zinc-200">دوران المخزون</h3>
          <p className="mb-4 text-xs text-zinc-500">أيام التغطية — حالي مقابل مستهدف</p>
          <div className="h-48 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryTurnoverData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} />
                <YAxis stroke="#a1a1aa" fontSize={11} />
                <Tooltip
                  formatter={(v) => `${v} يوماً`}
                  contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "0.5rem" }}
                />
                <Bar dataKey="value" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* WIP Details */}
        <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4 flex flex-col justify-center">
          <h3 className="mb-3 text-sm font-semibold text-zinc-200">أعمال تحت التنفيذ — تفاصيل</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-zinc-400">عدد المشاريع النشطة</span>
              <span className="font-semibold text-white">{activeProjects.length}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-zinc-400">نسبة الإنجاز المتوسطة</span>
              <span className="font-semibold text-accent">{avgCompletion.toFixed(1)}%</span>
            </li>
            <li className="flex justify-between">
              <span className="text-zinc-400">تكلفة متراكمة تقديرية</span>
              <span className="font-mono text-white">{formatSAR(totalWipCost)}</span>
            </li>
          </ul>
        </div>

        {/* Efficiency Indicator */}
        <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4 flex flex-col justify-center">
          <h3 className="mb-3 text-sm font-semibold text-zinc-200">مؤشر كفاءة التكلفة</h3>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-2">{(efficiencyRatio * 100).toFixed(0)}%</p>
            <p className="text-xs text-zinc-400">نسبة التكلفة الفعلية للمخطط لها</p>
            <div className="mt-4">
              <span
                className={`inline-block rounded px-3 py-1 text-sm ${
                  efficiencyRatio <= 0.95
                    ? "bg-green-900/40 text-green-300"
                    : efficiencyRatio <= 1.05
                      ? "bg-blue-900/40 text-blue-300"
                      : "bg-red-900/40 text-red-300"
                }`}
              >
                {efficiencyRatio <= 0.95 ? "كفاءة عالية" : efficiencyRatio <= 1.05 ? "ضمن المخطط" : "تجاوز"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Assets vs Liabilities */}
      <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4">
        <h3 className="mb-2 text-sm font-semibold text-zinc-200">أصول متداولة مقابل خصوم متداولة (تقدير بسيط)</h3>
        <p className="mb-4 text-xs text-zinc-500">
          لا تُمثل ميزانية فعلية — فقط نسب عمل وتقديرات لرأس المال العامل المطلوب.
        </p>
        <div className="h-56 w-full min-w-0" dir="ltr">
          <ResponsiveContainer width="100%" height={224}>
            <BarChart data={balanceData} margin={{ top: 8, right: 16, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} />
              <YAxis stroke="#a1a1aa" fontSize={11} tickFormatter={(v) => formatSAR(Number(v))} />
              <Tooltip
                formatter={(v) => formatSAR(Number(v ?? 0))}
                contentStyle={{ background: "#18181b", border: "1px solid #3f3f46" }}
              />
              <Legend wrapperStyle={{ direction: "rtl" }} />
              <Bar dataKey="assets" name="أصول متداولة" fill="#22d3ee" radius={[4, 4, 0, 0]} />
              <Bar dataKey="liabilities" name="خصوم متداولة" fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
