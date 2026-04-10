"use client";

import { useAccountingDemoState } from "@/lib/useAccountingDemoState";
import { formatSAR } from "@/lib/format-sar";
import { MOCK_CUSTOMERS, getUpcomingCompliance } from "@/lib/mock-data";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ExecutiveDashboardPage() {
  const state = useAccountingDemoState();
  const { last, arTotal, dso, currentRatio, grossMarginPct, netMarginPct, cashBuffer, cashCoverageDays, cumulativeEbitda, rows } = state;

  // KPIs
  const monthlyRevenue = last.revenue;
  const prevRevenue = rows.length > 1 ? rows[rows.length - 2].revenue : monthlyRevenue;
  const revenueChange = prevRevenue > 0 ? ((monthlyRevenue - prevRevenue) / prevRevenue) * 100 : 0;

  // Overdue AR (>90 days)
  const criticalCustomers = MOCK_CUSTOMERS.filter((c) => c.daysOverdue > 90);
  const overdueTotal = criticalCustomers.reduce((s, c) => s + c.arBalance, 0);
  const overduePct = arTotal > 0 ? (overdueTotal / arTotal) * 100 : 0;

  // Compliance alerts
  const upcomingItems = getUpcomingCompliance(7);

  // Trend chart (last 6 months)
  const trendData = rows.slice(6, 12).map((r, i) => ({
    month: `شهر ${i + 7}`,
    إيراد: Math.round(r.revenue / 1000),
    ربح: Math.round(r.ebitda / 1000),
  }));

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-white">اللوحة التنفيذية</h1>
        <p className="text-zinc-400">نظرة سريعة على الأداء المالي والتشغيلي — صممت للمدير</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-zinc-400 text-sm">الإيراد الشهري</p>
            <span
              className={`text-xs px-2 py-1 rounded ${
                revenueChange >= 0 ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"
              }`}
            >
              {revenueChange >= 0 ? "+" : ""}
              {revenueChange.toFixed(1)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-white">{formatSAR(monthlyRevenue)}</p>
          <p className="text-xs text-zinc-500 mt-1">مقارنة بالشهر السابق</p>
        </div>

        {/* Gross Margin */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">الهامش الإجمالي</p>
          <p className="text-3xl font-bold text-white">{grossMarginPct.toFixed(1)}%</p>
          <p className="text-xs text-zinc-500 mt-1">من الإيراد</p>
        </div>

        {/* Operating Profit */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">الربح التشغيلي (شهر أخير)</p>
          <p className={`text-3xl font-bold ${last.ebitda >= 0 ? "text-green-400" : "text-red-400"}`}>
            {formatSAR(last.ebitda)}
          </p>
          <p className="text-xs text-zinc-500 mt-1">تقريبي (قبل الفوائد والضرائب)</p>
        </div>

        {/* Cash Position */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-zinc-400 text-sm">الرصيد النقدي</p>
            <span
              className={`text-xs px-2 py-1 rounded ${
                cashCoverageDays >= 30 ? "bg-green-900/50 text-green-400" : cashCoverageDays >= 15 ? "bg-yellow-900/50 text-yellow-400" : "bg-red-900/50 text-red-400"
              }`}
            >
              {Math.round(cashCoverageDays)} يوماً
            </span>
          </div>
          <p className="text-3xl font-bold text-white">{formatSAR(cashBuffer)}</p>
          <p className="text-xs text-zinc-500 mt-1">أيام تغطية المصاريف</p>
        </div>

        {/* DSO Alert */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-zinc-400 text-sm">أيام التحصيل (DSO)</p>
            <span
              className={`text-xs px-2 py-1 rounded ${
                dso <= 60 ? "bg-green-900/50 text-green-400" : dso <= 90 ? "bg-yellow-900/50 text-yellow-400" : "bg-red-900/50 text-red-400"
              }`}
            >
              {dso > 90 ? "تحذير" : dso > 60 ? "متابعة" : "جيد"}
            </span>
          </div>
          <p className="text-3xl font-bold text-white">{dso}</p>
          <p className="text-xs text-zinc-500 mt-1">يوماً متوسط للتحصيل</p>
        </div>

        {/* Overdue AR */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-zinc-400 text-sm">ذمم متأخرة (&gt;90 يوماً)</p>
            <span
              className={`text-xs px-2 py-1 rounded ${
                overduePct < 10 ? "bg-green-900/50 text-green-400" : overduePct < 20 ? "bg-yellow-900/50 text-yellow-400" : "bg-red-900/50 text-red-400"
              }`}
            >
              {overduePct.toFixed(1)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-white">{formatSAR(overdueTotal)}</p>
          <p className="text-xs text-zinc-500 mt-1">{criticalCustomers.length} عميل بحاجة متابعة</p>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">اتجاه الإيراد والربح — آخر ٦ أشهر</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="month" tick={{ fill: "#a1a1aa" }} />
            <YAxis tick={{ fill: "#a1a1aa" }} label={{ value: "بالألف ريال", angle: -90, position: "insideLeft", fill: "#a1a1aa" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "0.5rem" }}
              labelStyle={{ color: "#e4e4e7" }}
              itemStyle={{ color: "#a1a1aa" }}
            />
            <Legend wrapperStyle={{ color: "#a1a1aa" }} />
            <Line type="monotone" dataKey="إيراد" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="ربح" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts */}
      {upcomingItems.length > 0 && (
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-yellow-400 mb-3">⚠️ تنبيهات امتثال قادمة (خلال ٧ أيام)</h3>
          <ul className="space-y-2">
            {upcomingItems.map((item) => (
              <li key={item.id} className="text-sm text-yellow-200">
                • <strong>{item.title}</strong> — موعد: {item.dueDate}
              </li>
            ))}
          </ul>
          <Link href="/compliance" className="text-yellow-400 underline text-sm mt-3 inline-block">
            عرض كل المواعيد →
          </Link>
        </div>
      )}

      {/* Quick Links */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">روابط سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/ruya"
            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg p-4 transition-colors text-center"
          >
            <p className="text-white font-semibold mb-1">لوحة الرؤى الكاملة</p>
            <p className="text-zinc-400 text-sm">رؤى محاسبية تفصيلية</p>
          </Link>
          <Link
            href="/playground"
            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg p-4 transition-colors text-center"
          >
            <p className="text-white font-semibold mb-1">المحاكاة المالية</p>
            <p className="text-zinc-400 text-sm">اختبر سيناريوهات مختلفة</p>
          </Link>
          <Link
            href="/cashflow"
            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg p-4 transition-colors text-center"
          >
            <p className="text-white font-semibold mb-1">التدفق النقدي</p>
            <p className="text-zinc-400 text-sm">تحليل وارد/صادر</p>
          </Link>
          <Link
            href="/projects"
            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg p-4 transition-colors text-center"
          >
            <p className="text-white font-semibold mb-1">ربحية المشاريع</p>
            <p className="text-zinc-400 text-sm">أداء كل مشروع</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
