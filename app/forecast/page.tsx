"use client";

import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatSAR } from "@/lib/format-sar";

type Scenario = "optimistic" | "base" | "conservative";
type Horizon = 3 | 6 | 12;

const BASE_REVENUE = 1_020_000;
const BASE_COST = 561_000 + 171_500;
const BASE_OPEX = 380_000;

const SCENARIO_CONFIG = {
  optimistic: { revenue: 1.15, cost: 0.92, opex: 0.95 },
  base: { revenue: 1.0, cost: 1.0, opex: 1.0 },
  conservative: { revenue: 0.85, cost: 1.08, opex: 1.05 },
} as const;

export default function ForecastPage() {
  const [scenario, setScenario] = useState<Scenario>("base");
  const [horizon, setHorizon] = useState<Horizon>(6);
  const [revenueGrowth, setRevenueGrowth] = useState(3); // % per month
  const [costChange, setCostChange] = useState(0); // % change
  const [additionalOpex, setAdditionalOpex] = useState(0); // SAR

  // Generate forecast data
  const forecastData = useMemo(() => {
    const data = [];
    const config = SCENARIO_CONFIG[scenario];
    const monthlyGrowth = revenueGrowth / 100;
    const costMultiplier = (1 + costChange / 100) * config.cost;

    for (let i = 1; i <= horizon; i++) {
      const revenue = BASE_REVENUE * config.revenue * Math.pow(1 + monthlyGrowth, i - 1);
      const cost = BASE_COST * costMultiplier;
      const opex = (BASE_OPEX + additionalOpex) * config.opex;
      const margin = revenue - cost;
      const profit = margin - opex;
      
      data.push({
        month: `شهر ${i}`,
        revenue: Math.round(revenue),
        margin: Math.round(margin),
        profit: Math.round(profit),
      });
    }
    return data;
  }, [scenario, horizon, revenueGrowth, costChange, additionalOpex]);

  // Cumulative cash balance (mock initial balance)
  const initialCash = 350_000;
  let runningCash = initialCash;
  const cashBalanceData = forecastData.map((m) => {
    runningCash += m.profit;
    return { month: m.month, balance: runningCash };
  });

  // Breakeven calculation (mock fixed costs)
  const fixedCosts = BASE_OPEX + additionalOpex;
  const variableCostRate = BASE_COST / BASE_REVENUE;
  const breakeven = fixedCosts / (1 - variableCostRate);

  // Sensitivity analysis (what if revenue drops by X%)
  const [sensitivityDrop, setSensitivityDrop] = useState(10);
  const sensitivityRevenue = forecastData[horizon - 1].revenue * (1 - sensitivityDrop / 100);
  const sensitivityCost = BASE_COST * SCENARIO_CONFIG[scenario].cost;
  const sensitivityMargin = sensitivityRevenue - sensitivityCost;
  const sensitivityProfit = sensitivityMargin - (BASE_OPEX + additionalOpex) * SCENARIO_CONFIG[scenario].opex;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-white">التوقعات المالية</h1>
        <p className="text-zinc-400">محاكاة الأداء المستقبلي — 3 سيناريوهات وتحليل حساسية</p>
      </div>

      {/* Configuration Panel */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">إعدادات التوقع</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Scenario Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">السيناريو</label>
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value as Scenario)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="optimistic">متفائل</option>
              <option value="base">أساس</option>
              <option value="conservative">متحفظ</option>
            </select>
          </div>

          {/* Horizon Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">الأفق الزمني</label>
            <select
              value={horizon}
              onChange={(e) => setHorizon(Number(e.target.value) as Horizon)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white"
            >
              <option value={3}>3 أشهر</option>
              <option value={6}>6 أشهر</option>
              <option value={12}>12 شهراً</option>
            </select>
          </div>

          {/* Revenue Growth */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              نمو الإيراد الشهري: {revenueGrowth}%
            </label>
            <input
              type="range"
              min={-5}
              max={10}
              step={0.5}
              value={revenueGrowth}
              onChange={(e) => setRevenueGrowth(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Cost Change */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              تغير التكلفة: {costChange >= 0 ? "+" : ""}{costChange}%
            </label>
            <input
              type="range"
              min={-10}
              max={20}
              step={1}
              value={costChange}
              onChange={(e) => setCostChange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Additional OPEX */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              مصاريف إضافية متوقعة: {formatSAR(additionalOpex)}
            </label>
            <input
              type="range"
              min={0}
              max={200_000}
              step={10_000}
              value={additionalOpex}
              onChange={(e) => setAdditionalOpex(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Forecast Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">جدول التوقعات الشهرية</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-400">
                <th className="pb-3 pr-2 text-right font-medium">الشهر</th>
                <th className="pb-3 pr-2 text-right font-medium">الإيراد المتوقع</th>
                <th className="pb-3 pr-2 text-right font-medium">الهامش</th>
                <th className="pb-3 pr-2 text-right font-medium">الربح التشغيلي</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((row, idx) => (
                <tr key={idx} className="border-b border-zinc-800/50">
                  <td className="py-3 pr-2 text-zinc-300">{row.month}</td>
                  <td className="py-3 pr-2 font-mono text-zinc-200">{formatSAR(row.revenue)}</td>
                  <td className="py-3 pr-2 font-mono text-zinc-200">{formatSAR(row.margin)}</td>
                  <td className={`py-3 pr-2 font-mono ${row.profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {formatSAR(row.profit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">مخطط التوقعات</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="month" tick={{ fill: "#a1a1aa" }} />
            <YAxis tick={{ fill: "#a1a1aa" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(v) => formatSAR(Number(v))}
              contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "0.5rem" }}
            />
            <Legend wrapperStyle={{ color: "#a1a1aa" }} />
            <Line type="monotone" dataKey="revenue" name="إيراد" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="margin" name="هامش" stroke="#fbbf24" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="profit" name="ربح" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cash Balance Projection */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">الرصيد النقدي المتوقع</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={cashBalanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="month" tick={{ fill: "#a1a1aa" }} />
            <YAxis tick={{ fill: "#a1a1aa" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(v) => formatSAR(Number(v))}
              contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "0.5rem" }}
            />
            <Line type="monotone" dataKey="balance" name="رصيد نقدي" stroke="#22d3ee" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Breakeven Analysis */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">نقطة التعادل (Breakeven)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-zinc-400 mb-2">إيراد نقطة التعادل (تقديري)</p>
            <p className="text-3xl font-bold text-white">{formatSAR(breakeven)}</p>
            <p className="text-xs text-zinc-500 mt-2">الإيراد المطلوب لتغطية التكاليف الثابتة والمتغيرة</p>
          </div>
          <div>
            <p className="text-sm text-zinc-400 mb-2">الإيراد الحالي (شهر أخير في التوقع)</p>
            <p className="text-3xl font-bold text-white">{formatSAR(forecastData[horizon - 1].revenue)}</p>
            <p className="text-xs text-zinc-500 mt-2">
              {forecastData[horizon - 1].revenue >= breakeven
                ? "✅ فوق نقطة التعادل — الشركة تحقق ربحاً"
                : "⚠️ تحت نقطة التعادل — مراجعة استراتيجية مطلوبة"}
            </p>
          </div>
        </div>
      </div>

      {/* Sensitivity Analysis */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">تحليل الحساسية</h2>
        <p className="text-sm text-zinc-400 mb-4">ماذا لو انخفض الإيراد؟</p>
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            نسبة انخفاض الإيراد: {sensitivityDrop}%
          </label>
          <input
            type="range"
            min={0}
            max={30}
            step={5}
            value={sensitivityDrop}
            onChange={(e) => setSensitivityDrop(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-zinc-800 rounded-lg p-4">
            <p className="text-xs text-zinc-500 mb-1">إيراد بعد الانخفاض</p>
            <p className="text-xl font-bold text-white">{formatSAR(sensitivityRevenue)}</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4">
            <p className="text-xs text-zinc-500 mb-1">الهامش</p>
            <p className="text-xl font-bold text-white">{formatSAR(sensitivityMargin)}</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4">
            <p className="text-xs text-zinc-500 mb-1">الربح التشغيلي</p>
            <p className={`text-xl font-bold ${sensitivityProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
              {formatSAR(sensitivityProfit)}
            </p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4">
            <p className="text-xs text-zinc-500 mb-1">الحالة</p>
            <p className={`text-xl font-bold ${sensitivityProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
              {sensitivityProfit >= 0 ? "مربح" : "خسارة"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
