"use client";

import { useState } from "react";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { formatSAR } from "@/lib/format-sar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { Project } from "@/lib/types";

export default function ProjectsPage() {
  const [filterStatus, setFilterStatus] = useState<"all" | Project["status"]>("all");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get unique regions
  const regions = ["all", ...new Set(MOCK_PROJECTS.map((p) => p.region))];

  // Filter projects
  const filteredProjects =
    filterStatus === "all"
      ? MOCK_PROJECTS
      : MOCK_PROJECTS.filter((p) => p.status === filterStatus);

  const finalProjects =
    filterRegion === "all"
      ? filteredProjects
      : filteredProjects.filter((p) => p.region === filterRegion);

  // Chart data
  const chartData = finalProjects.map((p) => ({
    name: p.jobNumber,
    هامش: p.marginPercent,
  }));

  // Summary stats
  const totalRevenue = finalProjects.reduce((sum, p) => sum + p.revenue, 0);
  const totalCost = finalProjects.reduce((sum, p) => sum + p.cost, 0);
  const totalMargin = totalRevenue - totalCost;
  const avgMarginPct =
    finalProjects.length > 0
      ? finalProjects.reduce((sum, p) => sum + p.marginPercent, 0) / finalProjects.length
      : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-white">ربحية المشاريع الفردية</h1>
        <p className="text-zinc-400">تحليل مالي لكل مشروع حفر — إيراد، تكلفة، وهامش ربح</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">عدد المشاريع</p>
          <p className="text-3xl font-bold text-white">{finalProjects.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">إجمالي الإيراد</p>
          <p className="text-2xl font-bold text-white">{formatSAR(totalRevenue)}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">إجمالي الهامش</p>
          <p className="text-2xl font-bold text-green-400">{formatSAR(totalMargin)}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 text-sm mb-2">متوسط الهامش %</p>
          <p className="text-3xl font-bold text-white">{avgMarginPct.toFixed(1)}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">فلترة المشاريع</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">حسب الحالة</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="all">الكل</option>
              <option value="active">تحت التنفيذ</option>
              <option value="completed">مكتمل</option>
              <option value="on-hold">معلق</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">حسب المنطقة</label>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region === "all" ? "الكل" : region}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Margin Comparison Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">مقارنة هامش الربح — حسب مشروع</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="name" tick={{ fill: "#a1a1aa" }} />
            <YAxis tick={{ fill: "#a1a1aa" }} label={{ value: "%", position: "insideLeft", fill: "#a1a1aa" }} />
            <Tooltip
              formatter={(v) => `${Number(v).toFixed(1)}%`}
              contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "0.5rem" }}
            />
            <Bar dataKey="هامش" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Projects Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">قائمة المشاريع</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-400">
                <th className="pb-3 pr-2 text-right font-medium">رقم</th>
                <th className="pb-3 pr-2 text-right font-medium">اسم المشروع</th>
                <th className="pb-3 pr-2 text-right font-medium">العميل</th>
                <th className="pb-3 pr-2 text-right font-medium">المنطقة</th>
                <th className="pb-3 pr-2 text-right font-medium">الإيراد</th>
                <th className="pb-3 pr-2 text-right font-medium">الهامش</th>
                <th className="pb-3 pr-2 text-right font-medium">هامش %</th>
                <th className="pb-3 pr-2 text-right font-medium">الحالة</th>
                <th className="pb-3 pr-2 text-right font-medium">التحصيل</th>
                <th className="pb-3 pr-2 text-right font-medium">تفاصيل</th>
              </tr>
            </thead>
            <tbody>
              {finalProjects.map((project) => (
                <tr key={project.id} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30">
                  <td className="py-3 pr-2 font-mono text-zinc-300">{project.jobNumber}</td>
                  <td className="py-3 pr-2 text-zinc-300">{project.name}</td>
                  <td className="py-3 pr-2 text-zinc-400">{project.client}</td>
                  <td className="py-3 pr-2 text-zinc-400">{project.region}</td>
                  <td className="py-3 pr-2 font-mono text-zinc-200">{formatSAR(project.revenue)}</td>
                  <td className="py-3 pr-2 font-mono text-green-400">{formatSAR(project.margin)}</td>
                  <td className="py-3 pr-2 font-mono text-white">{project.marginPercent.toFixed(1)}%</td>
                  <td className="py-3 pr-2">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs ${
                        project.status === "active"
                          ? "bg-blue-900/40 text-blue-300"
                          : project.status === "completed"
                            ? "bg-green-900/40 text-green-300"
                            : "bg-yellow-900/40 text-yellow-300"
                      }`}
                    >
                      {project.status === "active" ? "نشط" : project.status === "completed" ? "مكتمل" : "معلق"}
                    </span>
                  </td>
                  <td className="py-3 pr-2">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs ${
                        project.collectionStatus === "paid"
                          ? "bg-green-900/40 text-green-300"
                          : project.collectionStatus === "pending"
                            ? "bg-yellow-900/40 text-yellow-300"
                            : "bg-red-900/40 text-red-300"
                      }`}
                    >
                      {project.collectionStatus === "paid" ? "محصّل" : project.collectionStatus === "pending" ? "معلق" : "متأخر"}
                    </span>
                  </td>
                  <td className="py-3 pr-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-accent hover:underline"
                    >
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Project Details */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedProject.name}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-zinc-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-400">رقم المشروع</p>
                  <p className="text-lg font-mono text-white">{selectedProject.jobNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">العميل</p>
                  <p className="text-lg text-white">{selectedProject.client}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">المنطقة</p>
                  <p className="text-lg text-white">{selectedProject.region}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">الحالة</p>
                  <p className="text-lg text-white">
                    {selectedProject.status === "active" ? "تحت التنفيذ" : selectedProject.status === "completed" ? "مكتمل" : "معلق"}
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <h3 className="text-lg font-semibold text-white mb-3">الجدول الزمني</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-zinc-400">تاريخ البدء</p>
                    <p className="text-white">{selectedProject.startDate}</p>
                  </div>
                  {selectedProject.endDate && (
                    <div>
                      <p className="text-sm text-zinc-400">تاريخ الانتهاء</p>
                      <p className="text-white">{selectedProject.endDate}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-zinc-400">نسبة الإنجاز</p>
                    <p className="text-2xl font-bold text-accent">{selectedProject.percentComplete}%</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <h3 className="text-lg font-semibold text-white mb-3">المالية</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-400">الإيراد</span>
                    <span className="font-mono text-white">{formatSAR(selectedProject.revenue)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-400">التكلفة المباشرة</span>
                    <span className="font-mono text-white">{formatSAR(selectedProject.cost)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-300 font-semibold">هامش الربح</span>
                    <span className="font-mono font-bold text-green-400">{formatSAR(selectedProject.margin)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-zinc-300 font-semibold">نسبة الهامش</span>
                    <span className="font-mono font-bold text-white">{selectedProject.marginPercent.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <h3 className="text-lg font-semibold text-white mb-3">تفصيل التكلفة (تقديري)</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-400">عمالة</span>
                    <span className="font-mono text-zinc-200">{formatSAR(selectedProject.cost * 0.45)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-400">معدات</span>
                    <span className="font-mono text-zinc-200">{formatSAR(selectedProject.cost * 0.35)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-400">مواد</span>
                    <span className="font-mono text-zinc-200">{formatSAR(selectedProject.cost * 0.20)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
