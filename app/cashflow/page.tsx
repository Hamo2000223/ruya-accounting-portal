"use client";

import { useState } from "react";
import { useAccountingDemoState } from "@/lib/useAccountingDemoState";
import { formatSAR } from "@/lib/format-sar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function CashFlowPage() {
  const state = useAccountingDemoState();
  const { operatingCashFlow, investingCashFlow, financingCashFlow, netCashFlow, cashBuffer, cashCoverageDays, opexMonthly } = state;

  const [collectionDelay, setCollectionDelay] = useState(0); // Days delay stress test

  // Monthly cashflow simulation (mock data for 6 months)
  const monthlyData = [
    { month: "شهر 1", inflow: 920_000, outflow: -780_000, net: 140_000 },
    { month: "شهر 2", inflow: 1_050_000, outflow: -825_000, net: 225_000 },
    { month: "شهر 3", inflow: 980_000, outflow: -790_000, net: 190_000 },
    { month: "شهر 4", inflow: 1_120_000, outflow: -850_000, net: 270_000 },
    { month: "شهر 5", inflow: 1_040_000, outflow: -810_000, net: 230_000 },
    { month: "شهر 6", inflow: 1_080_000, outflow: -830_000, net: 250_000 },
  ];

  // Cumulative cash balance
  let runningBalance = cashBuffer;
  const balanceData = monthlyData.map((m) => {
    runningBalance += m.net;
    return { month: m.month, balance: runningBalance };
  });

  // Stress test: if collection delayed
  const stressedCashDays = collectionDelay > 0 ? Math.max(0, cashCoverageDays - collectionDelay) : cashCoverageDays;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-white">قائمة التدفق النقدي</h1>
        <p className="text-zinc-400">تحليل التدفقات الواردة والصادرة — تشغيلي، استثماري، تمويلي</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">التدفق التشغيلي</p>
          <p className={`text-2xl font-bold ${operatingCashFlow >= 0 ? "text-green-400" : "text-red-400"}`}>
            {formatSAR(operatingCashFlow)}
          </p>
          <p className="text-xs text-zinc-500 mt-1">من العمليات</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">التدفق الاستثماري</p>
          <p className={`text-2xl font-bold ${investingCashFlow >= 0 ? "text-green-400" : "text-red-400"}`}>
            {formatSAR(investingCashFlow)}
          </p>
          <p className="text-xs text-zinc-500 mt-1">نفقات رأسمالية</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">التدفق التمويلي</p>
          <p className={`text-2xl font-bold ${financingCashFlow >= 0 ? "text-green-400" : "text-red-400"}`}>
            {formatSAR(financingCashFlow)}
          </p>
          <p className="text-xs text-zinc-500 mt-1">تمويل/توزيعات</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">صافي التدفق</p>
          <p className={`text-2xl font-bold ${netCashFlow >= 0 ? "text-green-400" : "text-red-400"}`}>
            {formatSAR(netCashFlow)}
          </p>
          <p className="text-xs text-zinc-500 mt-1">إجمالي</p>
        </div>
      </div>

      {/* Monthly Inflow/Outflow Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">التدفقات الشهرية — وارد/صادر</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="month" tick={{ fill: "#a1a1aa" }} />
            <YAxis tick={{ fill: "#a1a1aa" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(v) => formatSAR(Number(v))}
              contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "0.5rem" }}
            />
            <Legend wrapperStyle={{ color: "#a1a1aa" }} />
            <Bar dataKey="inflow" name="وارد" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="outflow" name="صادر" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cumulative Cash Balance */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">الرصيد النقدي المتوقع — تراكمي</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={balanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="month" tick={{ fill: "#a1a1aa" }} />
            <YAxis tick={{ fill: "#a1a1aa" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(v) => formatSAR(Number(v))}
              contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "0.5rem" }}
            />
            <Legend wrapperStyle={{ color: "#a1a1aa" }} />
            <Line type="monotone" dataKey="balance" name="رصيد نقدي" stroke="#22d3ee" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stress Test */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">سيناريو ضغط — تأخير التحصيل</h2>
        <p className="text-sm text-zinc-400 mb-4">اختبر تأثير تأخر التحصيل على السيولة</p>
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            تأخير التحصيل: {collectionDelay} يوماً
          </label>
          <input
            type="range"
            min={0}
            max={60}
            step={5}
            value={collectionDelay}
            onChange={(e) => setCollectionDelay(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-800 rounded-lg p-4">
            <p className="text-zinc-400 text-sm mb-1">أيام تغطية نقدية (الحالي)</p>
            <p className="text-3xl font-bold text-white">{Math.round(cashCoverageDays)}</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4">
            <p className="text-zinc-400 text-sm mb-1">أيام تغطية بعد التأخير</p>
            <p className={`text-3xl font-bold ${stressedCashDays >= 30 ? "text-green-400" : stressedCashDays >= 15 ? "text-yellow-400" : "text-red-400"}`}>
              {Math.round(stressedCashDays)}
            </p>
          </div>
        </div>
        {stressedCashDays < 15 && (
          <div className="mt-4 bg-red-900/20 border border-red-700/50 rounded-lg p-4">
            <p className="text-red-400 text-sm">⚠️ تحذير: السيولة النقدية قد تصبح حرجة في حال تأخر التحصيل بهذا المقدار.</p>
          </div>
        )}
      </div>

      {/* Cash Coverage Days */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">تفاصيل أيام التغطية النقدية</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-zinc-800">
            <span className="text-zinc-400">الرصيد النقدي الحالي</span>
            <span className="font-mono text-white">{formatSAR(cashBuffer)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-zinc-800">
            <span className="text-zinc-400">المصاريف الشهرية</span>
            <span className="font-mono text-white">{formatSAR(opexMonthly)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-zinc-800">
            <span className="text-zinc-400">المصاريف اليومية (تقريباً)</span>
            <span className="font-mono text-white">{formatSAR(opexMonthly / 30)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-zinc-300 font-semibold">أيام التغطية</span>
            <span className="font-mono font-bold text-accent">{cashCoverageDays.toFixed(1)} يوماً</span>
          </div>
        </div>
        <p className="mt-4 text-xs text-zinc-500">
          <strong className="text-zinc-400">تفسير:</strong> الرصيد النقدي الحالي يكفي لتغطية المصاريف التشغيلية لمدة {Math.round(cashCoverageDays)} يوماً تقريباً.
        </p>
      </div>
    </div>
  );
}
