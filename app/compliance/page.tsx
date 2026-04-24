"use client";

import { MOCK_COMPLIANCE, getUpcomingCompliance } from "@/lib/mock-data";
import { useAccountingDemoState } from "@/lib/useAccountingDemoState";
import { formatSAR } from "@/lib/format-sar";

export default function CompliancePage() {
  const state = useAccountingDemoState();
  const { vatOutput, vatInput, netVatPosition } = state;

  // Upcoming deadlines (next 30 days)
  const upcomingItems = getUpcomingCompliance(30);

  // Calendar-like display (next 3 months)
  const months = [
    { name: "أبريل 2026", items: MOCK_COMPLIANCE.filter((c) => c.dueDate.startsWith("2026-04")) },
    { name: "مايو 2026", items: MOCK_COMPLIANCE.filter((c) => c.dueDate.startsWith("2026-05")) },
    { name: "يونيو 2026", items: MOCK_COMPLIANCE.filter((c) => c.dueDate.startsWith("2026-06")) },
  ];

  // Last 12 months status (mock data)
  const last12Months = [
    { month: "أبريل 2025", status: "submitted" },
    { month: "مايو 2025", status: "submitted" },
    { month: "يونيو 2025", status: "submitted" },
    { month: "يوليو 2025", status: "submitted" },
    { month: "أغسطس 2025", status: "submitted" },
    { month: "سبتمبر 2025", status: "submitted" },
    { month: "أكتوبر 2025", status: "submitted" },
    { month: "نوفمبر 2025", status: "submitted" },
    { month: "ديسمبر 2025", status: "submitted" },
    { month: "يناير 2026", status: "submitted" },
    { month: "فبراير 2026", status: "submitted" },
    { month: "مارس 2026", status: "pending" },
  ];

  // Zakat estimate (2.5% of base)
  const mockZakatBase = 8_500_000;
  const zakatEstimate = mockZakatBase * 0.025;

  // Balance with authority (mock)
  const balanceWithAuthority = -125_000; // Negative = owed to authority

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-white">لوحة الامتثال الضريبي والتنظيمي</h1>
        <p className="text-zinc-400">متابعة المواعيد، الإقرارات، والموقف الضريبي</p>
      </div>

      {/* Upcoming Alerts */}
      {upcomingItems.length > 0 && (
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">⚠️ تنبيهات قادمة (خلال ٣٠ يوماً)</h2>
          <ul className="space-y-2">
            {upcomingItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-yellow-200">
                  <strong>{item.title}</strong> — موعد: {item.dueDate}
                </span>
                <span
                  className={`inline-block rounded px-2 py-0.5 text-xs ${
                    item.status === "overdue"
                      ? "bg-red-900/60 text-red-200"
                      : "bg-yellow-900/60 text-yellow-200"
                  }`}
                >
                  {item.status === "overdue" ? "متأخر" : "قيد الانتظار"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tax Position Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* VAT Position */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">موقف ضريبة القيمة المضافة</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-zinc-800">
              <span className="text-zinc-400">ضريبة مخرجات (تقديري)</span>
              <span className="font-mono text-white">{formatSAR(vatOutput)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-800">
              <span className="text-zinc-400">ضريبة مدخلات (تقديري)</span>
              <span className="font-mono text-white">{formatSAR(vatInput)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-300 font-semibold">صافي الموقف</span>
              <span className={`font-mono font-bold ${netVatPosition >= 0 ? "text-red-400" : "text-green-400"}`}>
                {formatSAR(netVatPosition)}
              </span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            {netVatPosition > 0
              ? "مبلغ مستحق للهيئة — يُسدد مع الإقرار الدوري."
              : netVatPosition < 0
                ? "مبلغ قابل للاسترداد — يُطلب من الهيئة."
                : "الموقف متوازن."}
          </p>
        </div>

        {/* Zakat Estimate */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">زكاة تقديرية</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-zinc-800">
              <span className="text-zinc-400">الوعاء الزكوي التقديري</span>
              <span className="font-mono text-white">{formatSAR(mockZakatBase)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-800">
              <span className="text-zinc-400">نسبة الزكاة</span>
              <span className="font-mono text-white">2.5%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-300 font-semibold">زكاة متوقعة</span>
              <span className="font-mono font-bold text-amber-400">{formatSAR(zakatEstimate)}</span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            <strong className="text-zinc-400">ملاحظة:</strong> الوعاء الفعلي يحتاج مراجعة مع محاسب الزكاة لتطبيق الإعفاءات والتعديلات.
          </p>
        </div>
      </div>

      {/* Authority Balance */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">الرصيد مع الهيئة</h2>
        <div className="text-center">
          <p className="text-4xl font-bold mb-2" style={{ color: balanceWithAuthority < 0 ? "#ef4444" : "#10b981" }}>
            {formatSAR(balanceWithAuthority)}
          </p>
          <p className="text-zinc-400 text-sm">
            {balanceWithAuthority < 0
              ? "مبلغ مستحق (مدين للهيئة)"
              : balanceWithAuthority > 0
                ? "مبلغ مدفوع زيادة (دائن)"
                : "الحساب متوازن"}
          </p>
        </div>
      </div>

      {/* Compliance Calendar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">تقويم الامتثال — الأشهر القادمة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {months.map((month) => (
            <div key={month.name} className="bg-zinc-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">{month.name}</h3>
              {month.items.length > 0 ? (
                <ul className="space-y-2">
                  {month.items.map((item) => (
                    <li key={item.id} className="text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-zinc-300">{item.title}</span>
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            item.status === "submitted"
                              ? "bg-green-500"
                              : item.status === "overdue"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }`}
                        ></span>
                      </div>
                      <p className="text-xs text-zinc-500">موعد: {item.dueDate}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-500">لا توجد مواعيد</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Historical Submissions */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">حالة الإقرارات — آخر ١٢ شهراً</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {last12Months.map((m, idx) => (
            <div key={idx} className="bg-zinc-800 rounded-lg p-3 text-center">
              <p className="text-xs text-zinc-400 mb-2">{m.month}</p>
              <span
                className={`inline-block w-3 h-3 rounded-full ${
                  m.status === "submitted" ? "bg-green-500" : "bg-yellow-500"
                }`}
              ></span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
            <span>مقدّم في الموعد</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
            <span>قيد الإعداد</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
            <span>متأخر</span>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">روابط سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="https://zatca.gov.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 hover:bg-zinc-700 rounded-lg p-4 text-center transition-colors"
          >
            <p className="text-white font-semibold mb-1">منصة ZATCA</p>
            <p className="text-zinc-400 text-xs">هيئة الزكاة والضريبة</p>
          </a>
          <a
            href="https://my.gov.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 hover:bg-zinc-700 rounded-lg p-4 text-center transition-colors"
          >
            <p className="text-white font-semibold mb-1">بوابة my.gov.sa</p>
            <p className="text-zinc-400 text-xs">الخدمات الحكومية</p>
          </a>
          <a
            href="https://fatoora.zatca.gov.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 hover:bg-zinc-700 rounded-lg p-4 text-center transition-colors"
          >
            <p className="text-white font-semibold mb-1">فاتورة</p>
            <p className="text-zinc-400 text-xs">الفوترة الإلكترونية</p>
          </a>
          <a
            href="https://muqeem.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 hover:bg-zinc-700 rounded-lg p-4 text-center transition-colors"
          >
            <p className="text-white font-semibold mb-1">مقيم</p>
            <p className="text-zinc-400 text-xs">الجوازات والعمل</p>
          </a>
        </div>
      </div>
    </div>
  );
}
