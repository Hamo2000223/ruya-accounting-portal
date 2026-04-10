"use client";

import { useAccountingDemoState } from "@/lib/useAccountingDemoState";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function RatiosPage() {
  const state = useAccountingDemoState();
  const { currentRatio, quickRatio, grossMarginPct, netMarginPct, inventoryTurnover, dso, dpo } = state;

  // Historical trend data (mock — last 6 months)
  const trendData = [
    { month: "شهر 1", currentRatio: 1.42, grossMargin: 42.5, netMargin: 16.2, inventoryTurnover: 8.2 },
    { month: "شهر 2", currentRatio: 1.48, grossMargin: 43.1, netMargin: 17.0, inventoryTurnover: 8.5 },
    { month: "شهر 3", currentRatio: 1.53, grossMargin: 43.8, netMargin: 17.8, inventoryTurnover: 8.8 },
    { month: "شهر 4", currentRatio: 1.51, grossMargin: 43.2, netMargin: 17.3, inventoryTurnover: 8.6 },
    { month: "شهر 5", currentRatio: currentRatio * 0.97, grossMargin: grossMarginPct * 0.98, netMargin: netMarginPct * 0.96, inventoryTurnover: inventoryTurnover * 0.95 },
    { month: "شهر 6", currentRatio, grossMargin: grossMarginPct, netMargin: netMarginPct, inventoryTurnover },
  ];

  // Industry benchmarks (mock)
  const benchmarks = {
    currentRatio: 1.5,
    quickRatio: 1.0,
    grossMargin: 40.0,
    netMargin: 15.0,
    inventoryTurnover: 8.0,
    dso: 60,
    dpo: 45,
  };

  // Ratio categories
  const liquidityRatios = [
    { name: "النسبة المتداولة", value: currentRatio, unit: "ratio", benchmark: benchmarks.currentRatio, interpretation: "قدرة الشركة على سداد التزاماتها قصيرة الأجل" },
    { name: "النسبة السريعة", value: quickRatio, unit: "ratio", benchmark: benchmarks.quickRatio, interpretation: "السيولة دون احتساب المخزون" },
  ];

  const profitabilityRatios = [
    { name: "هامش إجمالي", value: grossMarginPct, unit: "percent", benchmark: benchmarks.grossMargin, interpretation: "الربح من المبيعات بعد خصم التكلفة المباشرة" },
    { name: "هامش صافي", value: netMarginPct, unit: "percent", benchmark: benchmarks.netMargin, interpretation: "الربح الصافي كنسبة من الإيراد" },
  ];

  const efficiencyRatios = [
    { name: "دوران المخزون", value: inventoryTurnover, unit: "ratio", benchmark: benchmarks.inventoryTurnover, interpretation: "عدد المرات التي يُباع فيها المخزون سنوياً" },
    { name: "أيام التحصيل (DSO)", value: dso, unit: "days", benchmark: benchmarks.dso, interpretation: "متوسط الأيام لتحصيل الذمم المدينة" },
    { name: "أيام الدفع (DPO)", value: dpo, unit: "days", benchmark: benchmarks.dpo, interpretation: "متوسط الأيام لسداد الموردين" },
  ];

  const formatValue = (value: number, unit: string) => {
    if (unit === "percent") return `${value.toFixed(1)}%`;
    if (unit === "days") return `${value.toFixed(0)} يوماً`;
    return value.toFixed(2);
  };

  const getStatus = (value: number, benchmark: number, unit: string, higher_is_better = true) => {
    const diff = higher_is_better ? value - benchmark : benchmark - value;
    if (Math.abs(diff / benchmark) < 0.1) return "neutral";
    return diff > 0 ? "good" : "bad";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-white">النسب المالية</h1>
        <p className="text-zinc-400">مؤشرات السيولة، الربحية، والكفاءة — مقارنة بمعايير القطاع</p>
      </div>

      {/* Liquidity Ratios */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">نسب السيولة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liquidityRatios.map((ratio) => {
            const status = getStatus(ratio.value, ratio.benchmark, ratio.unit, true);
            return (
              <div key={ratio.name} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{ratio.name}</h3>
                <div className="flex items-end gap-4 mb-3">
                  <p className="text-4xl font-bold text-white">{formatValue(ratio.value, ratio.unit)}</p>
                  <p className="text-sm text-zinc-400 mb-2">
                    معيار: {formatValue(ratio.benchmark, ratio.unit)}
                  </p>
                </div>
                <span
                  className={`inline-block rounded px-3 py-1 text-sm mb-3 ${
                    status === "good" ? "bg-green-900/40 text-green-300" : status === "bad" ? "bg-red-900/40 text-red-300" : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {status === "good" ? "أعلى من المعيار" : status === "bad" ? "أقل من المعيار" : "ضمن المعيار"}
                </span>
                <p className="text-xs text-zinc-400">{ratio.interpretation}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Profitability Ratios */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">نسب الربحية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profitabilityRatios.map((ratio) => {
            const status = getStatus(ratio.value, ratio.benchmark, ratio.unit, true);
            return (
              <div key={ratio.name} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{ratio.name}</h3>
                <div className="flex items-end gap-4 mb-3">
                  <p className="text-4xl font-bold text-white">{formatValue(ratio.value, ratio.unit)}</p>
                  <p className="text-sm text-zinc-400 mb-2">
                    معيار: {formatValue(ratio.benchmark, ratio.unit)}
                  </p>
                </div>
                <span
                  className={`inline-block rounded px-3 py-1 text-sm mb-3 ${
                    status === "good" ? "bg-green-900/40 text-green-300" : status === "bad" ? "bg-red-900/40 text-red-300" : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {status === "good" ? "أعلى من المعيار" : status === "bad" ? "أقل من المعيار" : "ضمن المعيار"}
                </span>
                <p className="text-xs text-zinc-400">{ratio.interpretation}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Efficiency Ratios */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">نسب الكفاءة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {efficiencyRatios.map((ratio) => {
            const higher_is_better = ratio.name === "دوران المخزون";
            const status = getStatus(ratio.value, ratio.benchmark, ratio.unit, higher_is_better);
            return (
              <div key={ratio.name} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{ratio.name}</h3>
                <div className="mb-3">
                  <p className="text-4xl font-bold text-white mb-1">{formatValue(ratio.value, ratio.unit)}</p>
                  <p className="text-sm text-zinc-400">
                    معيار: {formatValue(ratio.benchmark, ratio.unit)}
                  </p>
                </div>
                <span
                  className={`inline-block rounded px-3 py-1 text-sm mb-3 ${
                    status === "good" ? "bg-green-900/40 text-green-300" : status === "bad" ? "bg-red-900/40 text-red-300" : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {status === "good" ? "أفضل من المعيار" : status === "bad" ? "أقل من المعيار" : "ضمن المعيار"}
                </span>
                <p className="text-xs text-zinc-400">{ratio.interpretation}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Trends */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">اتجاهات النسب المالية — آخر ٦ أشهر</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Liquidity Trend */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">النسبة المتداولة</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                <YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} domain={[1.0, 2.0]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "0.5rem" }}
                  formatter={(v) => Number(v).toFixed(2)}
                />
                <Line type="monotone" dataKey="currentRatio" name="النسبة المتداولة" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Profitability Trend */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">الهامش الإجمالي والصافي (%)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                <YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "0.5rem" }}
                  formatter={(v) => `${Number(v).toFixed(1)}%`}
                />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#a1a1aa" }} />
                <Line type="monotone" dataKey="grossMargin" name="هامش إجمالي" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="netMargin" name="هامش صافي" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Interpretation Guide */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">دليل تفسير النسب</h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <div className="pb-3 border-b border-zinc-800">
            <strong className="text-zinc-300">النسبة المتداولة:</strong> يُفضل أن تكون أكبر من 1.5 لضمان سيولة كافية. نسبة أقل من 1.0 تعني صعوبة في سداد الالتزامات قصيرة الأجل.
          </div>
          <div className="pb-3 border-b border-zinc-800">
            <strong className="text-zinc-300">النسبة السريعة:</strong> مثل المتداولة لكن بدون المخزون. نسبة 1.0 أو أعلى تُعتبر جيدة.
          </div>
          <div className="pb-3 border-b border-zinc-800">
            <strong className="text-zinc-300">الهامش الإجمالي:</strong> كلما زادت النسبة، كانت الشركة أكثر كفاءة في التحكم بالتكاليف المباشرة. أقل من 30% قد يكون مؤشر سلبي.
          </div>
          <div className="pb-3 border-b border-zinc-800">
            <strong className="text-zinc-300">دوران المخزون:</strong> كلما زاد الدوران، قلّت الأموال المجمدة في المخزون. انخفاض الدوران قد يعني بطء في المبيعات.
          </div>
          <div>
            <strong className="text-zinc-300">DSO و DPO:</strong> DSO منخفض يعني تحصيل سريع. DPO مرتفع يعني الاستفادة من آجال الموردين — لكن يجب التوازن للحفاظ على علاقة جيدة.
          </div>
        </div>
      </div>
    </div>
  );
}
