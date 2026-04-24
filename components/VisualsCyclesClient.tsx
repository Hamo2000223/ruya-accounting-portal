"use client";

import { useState } from "react";
import { DocumentCycleVisual } from "./DocumentCycleVisual";
import { SalesCycleVisual } from "./SalesCycleVisual";
import { PayrollCycleVisual } from "./PayrollCycleVisual";
import { FixedAssetsCycleVisual } from "./FixedAssetsCycleVisual";
import { ExpenseCycleVisual } from "./ExpenseCycleVisual";
import { VisualCycleDetail } from "./VisualCycleDetail";
import {
  expenseMeta,
  fixedAssetsMeta,
  payrollMeta,
  purchaseMeta,
  salesMeta,
} from "@/lib/document-cycle-data";

const tabs = [
  { id: "purchase", label: "دورة الشراء", meta: purchaseMeta },
  { id: "sales", label: "دورة المبيعات", meta: salesMeta },
  { id: "payroll", label: "دورة الرواتب", meta: payrollMeta },
  { id: "assets", label: "دورة الأصول", meta: fixedAssetsMeta },
  { id: "expense", label: "دورة المصاريف", meta: expenseMeta },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function VisualsCyclesClient() {
  const [active, setActive] = useState<TabId>("purchase");

  const current = tabs.find((t) => t.id === active)!;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2 border-b border-zinc-800 pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              active === t.id
                ? "bg-accent/20 text-accent ring-1 ring-accent/40"
                : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
            aria-pressed={active === t.id}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="min-h-[240px]" key={active}>
        {active === "purchase" && <DocumentCycleVisual />}
        {active === "sales" && <SalesCycleVisual />}
        {active === "payroll" && <PayrollCycleVisual />}
        {active === "assets" && <FixedAssetsCycleVisual />}
        {active === "expense" && <ExpenseCycleVisual />}
      </div>

      <VisualCycleDetail meta={current.meta} />
    </div>
  );
}
