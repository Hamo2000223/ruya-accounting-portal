"use client";

import { MOCK_BUDGET } from "@/lib/mock-data";
import { formatSAR } from "@/lib/format-sar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BudgetVariancePage() {
  // Calculate totals
  const totalBudgeted = MOCK_BUDGET.reduce((sum, item) => sum + item.budgeted, 0);
  const totalActual = MOCK_BUDGET.reduce((sum, item) => sum + item.actual, 0);
  const totalVariance = totalActual - totalBudgeted;
  const totalVariancePct = totalBudgeted > 0 ? (totalVariance / totalBudgeted) * 100 : 0;

  // Top 5 variances (absolute value)
  const topVariances = [...MOCK_BUDGET]
    .sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance))
    .slice(0, 5);

  // Chart data
  const chartData = MOCK_BUDGET.map((item) => ({
    name: item.category,
    موازنة: item.budgeted,
    فعلي: item.actual,
  }));

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-white">الموازنة مقابل الفعلي</h1>
        <p className="text-zinc-400">مقارنة الأداء الفعلي مع المخطط — تحليل الانحرافات</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">إجمالي الموازنة</p>
          <p className="text-3xl font-bold text-white">{formatSAR(totalBudgeted)}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">إجمالي الفعلي</p>
          <p className="text-3xl font-bold text-white">{formatSAR(totalActual)}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">الانحراف الكلي</p>
          <p className={`text-3xl font-bold ${totalVariance >= 0 ? "text-green-400" : "text-red-400"}`}>
            {formatSAR(totalVariance)}
          </p>
          <p className="text-sm text-zinc-400 mt-1">
            {totalVariancePct >= 0 ? "+" : ""}{totalVariancePct.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">جدول المقارنة التفصيلي</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-400">
                <th className="pb-3 pr-2 text-right font-medium">البند</th>
                <th className="pb-3 pr-2 text-right font-medium">الموازنة</th>
                <th className="pb-3 pr-2 text-right font-medium">الفعلي</th>
                <th className="pb-3 pr-2 text-right font-medium">الانحراف</th>
                <th className="pb-3 pr-2 text-right font-medium">الانحراف %</th>
                <th className="pb-3 pr-2 text-right font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BUDGET.map((item, idx) => {
                const isRevenue = item.category.includes("إيراد");
                const isGood = isRevenue ? item.variance > 0 : item.variance < 0;
                return (
                  <tr key={idx} className="border-b border-zinc-800/50 last:border-0">
                    <td className="py-3 pr-2 text-zinc-300">{item.category}</td>
                    <td className="py-3 pr-2 font-mono text-zinc-200">{formatSAR(item.budgeted)}</td>
                    <td className="py-3 pr-2 font-mono text-zinc-200">{formatSAR(item.actual)}</td>
                    <td className={`py-3 pr-2 font-mono ${item.variance >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {item.variance >= 0 ? "+" : ""}{formatSAR(item.variance)}
                    </td>
                    <td className={`py-3 pr-2 font-mono ${item.variance >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {item.variance >= 0 ? "+" : ""}{item.variancePercent.toFixed(1)}%
                    </td>
                    <td className="py-3 pr-2">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-xs ${
                          isGood
                            ? "bg-green-900/40 text-green-300"
                            : Math.abs(item.variancePercent) < 5
                              ? "bg-zinc-800 text-zinc-300"
                              : "bg-red-900/40 text-red-300"
                        }`}
                      >
                        {isGood ? "إيجابي" : Math.abs(item.variancePercent) < 5 ? "ضمن الهدف" : "يحتاج متابعة"}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {/* Totals Row */}
              <tr className="border-t-2 border-zinc-700 font-semibold">
                <td className="py-3 pr-2 text-zinc-200">الإجمالي</td>
                <td className="py-3 pr-2 font-mono text-white">{formatSAR(totalBudgeted)}</td>
                <td className="py-3 pr-2 font-mono text-white">{formatSAR(totalActual)}</td>
                <td className={`py-3 pr-2 font-mono ${totalVariance >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {totalVariance >= 0 ? "+" : ""}{formatSAR(totalVariance)}
                </td>
                <td className={`py-3 pr-2 font-mono ${totalVariancePct >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {totalVariancePct >= 0 ? "+" : ""}{totalVariancePct.toFixed(1)}%
                </td>
                <td className="py-3 pr-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">مخططات المقارنة</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="name" tick={{ fill: "#a1a1aa", fontSize: 10 }} angle={-15} textAnchor="end" height={80} />
            <YAxis tick={{ fill: "#a1a1aa" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(v) => formatSAR(Number(v))}
              contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "0.5rem" }}
            />
            <Legend wrapperStyle={{ color: "#a1a1aa" }} />
            <Bar dataKey="موازنة" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="فعلي" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 5 Variances Analysis */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">أكبر ٥ انحرافات (حسب القيمة المطلقة)</h2>
        <p className="text-sm text-zinc-400 mb-4">البنود التي تحتاج مراجعة وتوضيح</p>
        <div className="space-y-4">
          {topVariances.map((item, idx) => {
            const isRevenue = item.category.includes("إيراد");
            const isGood = isRevenue ? item.variance > 0 : item.variance < 0;
            return (
              <div key={idx} className="bg-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{item.category}</h3>
                  <span
                    className={`inline-block rounded px-3 py-1 text-sm ${
                      isGood ? "bg-green-900/40 text-green-300" : "bg-red-900/40 text-red-300"
                    }`}
                  >
                    {item.variance >= 0 ? "+" : ""}{formatSAR(item.variance)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-500">الموازنة</p>
                    <p className="font-mono text-zinc-200">{formatSAR(item.budgeted)}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">الفعلي</p>
                    <p className="font-mono text-zinc-200">{formatSAR(item.actual)}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">الانحراف %</p>
                    <p className={`font-mono ${item.variance >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {item.variance >= 0 ? "+" : ""}{item.variancePercent.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-zinc-700">
                  <p className="text-xs text-zinc-400">
                    <strong className="text-zinc-300">ملاحظة:</strong>{" "}
                    {isGood
                      ? isRevenue
                        ? "أداء إيجابي — الإيراد تجاوز المخطط."
                        : "كفاءة جيدة — التكلفة أقل من المخطط."
                      : isRevenue
                        ? "إيراد أقل من المتوقع — يحتاج مراجعة استراتيجية."
                        : "تجاوز في التكلفة — يحتاج ضبط ومتابعة."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
