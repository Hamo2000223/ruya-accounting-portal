"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatSAR } from "@/lib/format-sar";
import type { AccountingDemoState } from "@/lib/useAccountingDemoState";

const BRIDGE_COLORS = ["#22d3ee", "#f87171", "#fbbf24", "#f472b6", "#34d399"];

type Props = { s: AccountingDemoState };

export function ReportingBridge({ s }: Props) {
  const data = s.bridgeSteps.map((step, i) => ({
    ...step,
    fill: BRIDGE_COLORS[i % BRIDGE_COLORS.length],
    display: step.value,
  }));

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-zinc-400">
        <strong className="text-zinc-300">جسر تقريري مبسّط</strong> لشهر ١٢ من المحاكاة: من الإيراد إلى الربح التشغيلي التقريبي (قبل الإهلاك والتمويل).
      </p>

      <div className="rounded-2xl border border-zinc-800 bg-surface-raised/60 p-4">
        <h3 className="mb-4 text-sm font-semibold text-zinc-200">خطوات الجسر (قيم شهر ١٢)</h3>
        <div className="h-72 w-full min-w-0" dir="ltr">
          <ResponsiveContainer width="100%" height={288}>
            <BarChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 48 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={10} interval={0} angle={-25} textAnchor="end" height={70} />
              <YAxis stroke="#a1a1aa" fontSize={11} tickFormatter={(v) => formatSAR(Number(v))} />
              <Tooltip
                formatter={(v) => formatSAR(Number(v ?? 0))}
                contentStyle={{ background: "#18181b", border: "1px solid #3f3f46" }}
              />
              <Bar dataKey="display" name="المبلغ">
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-surface-raised/40 p-4 text-sm text-zinc-400">
        <p>
          <strong className="text-zinc-200">تراكم ربح تشغيلي تقريبي (١٢ شهراً):</strong>{" "}
          <span className="font-mono text-accent">{formatSAR(s.cumulativeEbitda)}</span>
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          الربح المحاسبي لا يساوي النقد دائماً (ذمم، مخزون، استقطاعات، توقيت مستخلصات).
        </p>
      </div>
    </div>
  );
}
