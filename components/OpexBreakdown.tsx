"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatSAR } from "@/lib/format-sar";
import { SliderField } from "./SliderField";
import { OPEX_LABELS, type AccountingDemoState } from "@/lib/useAccountingDemoState";

const COLORS = ["#22d3ee", "#6366f1", "#fbbf24", "#f472b6", "#a78bfa", "#34d399"];

type Props = { s: AccountingDemoState };

export function OpexBreakdown({ s }: Props) {
  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-zinc-400">
        <strong className="text-zinc-300">المصاريف التشغيلية:</strong> بنود مستوحاة من دليل الحسابات — التوزيع
        كنسب ثابتة للعرض.
      </p>

      <SliderField
        label="إجمالي المصاريف التشغيلية الشهرية"
        value={s.opexMonthly}
        onChange={s.setOpexMonthly}
        min={50_000}
        max={3_000_000}
        step={25_000}
      />

      <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4">
        <h3 className="mb-4 text-sm font-semibold text-zinc-200">توزيع المصاريف التشغيلية (نموذج نسبي)</h3>
        <div className="h-72 w-full min-w-0 overflow-x-auto" dir="ltr">
          <ResponsiveContainer width="100%" height={288} minWidth={480}>
            <BarChart data={[s.opexChartRow]} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} />
              <YAxis stroke="#a1a1aa" fontSize={11} tickFormatter={(v) => formatSAR(Number(v))} />
              <Tooltip
                formatter={(v) => formatSAR(Number(v ?? 0))}
                contentStyle={{ background: "#18181b", border: "1px solid #3f3f46" }}
              />
              <Legend wrapperStyle={{ direction: "rtl" }} />
              {OPEX_LABELS.map(({ key, label }, i) => (
                <Bar key={key} dataKey={key} stackId="a" fill={COLORS[i % COLORS.length]} name={label} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ul className="grid gap-2 text-sm text-zinc-500 sm:grid-cols-2">
        {s.opexBreakdownList.map((x) => (
          <li key={x.key} className="flex justify-between rounded-lg border border-zinc-800/80 px-3 py-2">
            <span>{x.label}</span>
            <span className="font-mono text-zinc-300">{formatSAR(x.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
