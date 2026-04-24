"use client";

import { useMemo, useState } from "react";

export type MonthRow = {
  month: string;
  drilling: number;
  product: number;
  revenue: number;
  gross: number;
  ebitda: number;
};

export const OPEX_LABELS = [
  { key: "payroll", label: "رواتب وتأمينات" },
  { key: "rent", label: "إيجار معدات" },
  { key: "maint", label: "صيانة" },
  { key: "transport", label: "نقل" },
  { key: "admin", label: "إدارة" },
  { key: "hse", label: "سلامة وتدريب" },
] as const;

const DEFAULT_OPEX_WEIGHTS: Record<(typeof OPEX_LABELS)[number]["key"], number> = {
  payroll: 0.35,
  rent: 0.15,
  maint: 0.15,
  transport: 0.12,
  admin: 0.13,
  hse: 0.1,
};

function monthAtIndex(
  drillingM1: number,
  dg: number,
  productM1: number,
  pg: number,
  dcp: number,
  pcp: number,
  opexMonthly: number,
  i: number,
) {
  const drilling = drillingM1 * Math.pow(1 + dg, i);
  const product = productM1 * Math.pow(1 + pg, i);
  const revenue = drilling + product;
  const direct = drilling * dcp + product * pcp;
  const gross = revenue - direct;
  const ebitda = gross - opexMonthly;
  return { drilling, product, revenue, direct, gross, ebitda };
}

export function useAccountingDemoState() {
  const [drillingM1, setDrillingM1] = useState(800_000);
  const [drillingGrowth, setDrillingGrowth] = useState(2);
  const [productM1, setProductM1] = useState(220_000);
  const [productGrowth, setProductGrowth] = useState(3);
  const [drillingDirectPct, setDrillingDirectPct] = useState(55);
  const [productCogsPct, setProductCogsPct] = useState(70);
  const [opexMonthly, setOpexMonthly] = useState(380_000);

  const [dso, setDso] = useState(75);
  const [dpo, setDpo] = useState(45);
  const [inventoryDays, setInventoryDays] = useState(55);
  const [wipScale, setWipScale] = useState(45);
  const [cashBuffer, setCashBuffer] = useState(350_000);
  const [monthlyPurchases, setMonthlyPurchases] = useState(520_000);

  const [vatRate, setVatRate] = useState(15);
  const [vatOnTradeOnly, setVatOnTradeOnly] = useState(true);
  const [vatRecoveryPct, setVatRecoveryPct] = useState(80);

  const dg = drillingGrowth / 100;
  const pg = productGrowth / 100;
  const dcp = drillingDirectPct / 100;
  const pcp = productCogsPct / 100;

  const rows = useMemo(() => {
    const out: MonthRow[] = [];
    for (let i = 0; i < 12; i++) {
      const m = monthAtIndex(drillingM1, dg, productM1, pg, dcp, pcp, opexMonthly, i);
      out.push({
        month: `شهر ${i + 1}`,
        drilling: m.drilling,
        product: m.product,
        revenue: m.revenue,
        gross: m.gross,
        ebitda: m.ebitda,
      });
    }
    return out;
  }, [drillingM1, dg, productM1, pg, dcp, pcp, opexMonthly]);

  const last = useMemo(
    () => monthAtIndex(drillingM1, dg, productM1, pg, dcp, pcp, opexMonthly, 11),
    [drillingM1, dg, productM1, pg, dcp, pcp, opexMonthly],
  );

  const cumulativeEbitda = useMemo(() => rows.reduce((s, r) => s + r.ebitda, 0), [rows]);

  const arTotal = useMemo(() => {
    const factor = Math.min(4, Math.max(0.5, dso / 30));
    return last.revenue * factor * 0.85;
  }, [last.revenue, dso]);

  const arAging = useMemo(() => {
    const t = arTotal;
    const late = Math.min(0.55, Math.max(0.08, (dso - 35) / 130));
    const mid = Math.min(0.35, (1 - late) * 0.45);
    const b4 = t * late;
    const b3 = t * mid;
    const b2 = t * Math.min(0.28, (1 - late - mid) * 0.55);
    const b1 = Math.max(0, t - b2 - b3 - b4);
    return [
      { name: "٠–٣٠ يوماً", value: Math.round(b1) },
      { name: "٣١–٦٠", value: Math.round(b2) },
      { name: "٦١–٩٠", value: Math.round(b3) },
      { name: "أكثر من ٩٠", value: Math.round(b4) },
    ];
  }, [arTotal, dso]);

  const apEstimated = useMemo(() => monthlyPurchases * Math.min(3, Math.max(0.3, dpo / 30)) * 0.45, [monthlyPurchases, dpo]);

  const inventoryEstimated = useMemo(() => {
    const monthlyCogsProduct = last.product * pcp;
    return monthlyCogsProduct * Math.min(3, Math.max(0.2, inventoryDays / 30));
  }, [last.product, pcp, inventoryDays]);

  const wipEstimated = useMemo(() => {
    return last.drilling * dcp * (wipScale / 100) * 0.65;
  }, [last.drilling, dcp, wipScale]);

  const taxableSales = vatOnTradeOnly ? last.product : last.revenue;
  const vatOutput = (taxableSales * vatRate) / 100;
  const vatInput = (monthlyPurchases * vatRate * vatRecoveryPct) / 10000;
  const netVatPosition = vatOutput - vatInput;

  const payrollAccrual = opexMonthly * 0.12;
  const currentAssets = cashBuffer + arTotal + inventoryEstimated + wipEstimated;
  const currentLiabilities = apEstimated + Math.max(0, netVatPosition) + payrollAccrual;

  const opexBreakdownList = useMemo(
    () =>
      OPEX_LABELS.map(({ key, label }) => ({
        key,
        label,
        value: Math.round(opexMonthly * DEFAULT_OPEX_WEIGHTS[key]),
      })),
    [opexMonthly],
  );

  const opexChartRow = useMemo(() => {
    const row: Record<string, string | number> = { name: "شهر نموذجي" };
    for (const { key } of OPEX_LABELS) {
      row[key] = Math.round(opexMonthly * DEFAULT_OPEX_WEIGHTS[key]);
    }
    return row;
  }, [opexMonthly]);

  const bridgeSteps = useMemo(
    () => [
      { name: "إيراد الشهر ١٢", value: last.revenue },
      { name: "− تكلفة مباشرة", value: -last.direct },
      { name: "= هامش إجمالي", value: last.gross },
      { name: "− مصاريف تشغيلية", value: -opexMonthly },
      { name: "= ربح تشغيلي تقريبي", value: last.ebitda },
    ],
    [last, opexMonthly],
  );

  // Financial Ratios
  const currentRatio = useMemo(() => (currentLiabilities > 0 ? currentAssets / currentLiabilities : 0), [currentAssets, currentLiabilities]);
  const quickRatio = useMemo(() => {
    const quickAssets = currentAssets - inventoryEstimated;
    return currentLiabilities > 0 ? quickAssets / currentLiabilities : 0;
  }, [currentAssets, inventoryEstimated, currentLiabilities]);
  
  const grossMarginPct = useMemo(() => (last.revenue > 0 ? (last.gross / last.revenue) * 100 : 0), [last.gross, last.revenue]);
  const netMarginPct = useMemo(() => (last.revenue > 0 ? (last.ebitda / last.revenue) * 100 : 0), [last.ebitda, last.revenue]);
  
  const inventoryTurnover = useMemo(() => {
    const annualCogs = last.product * pcp * 12;
    return inventoryEstimated > 0 ? annualCogs / inventoryEstimated : 0;
  }, [last.product, pcp, inventoryEstimated]);
  
  // Cash Flow Estimates
  const operatingCashFlow = useMemo(() => {
    return last.ebitda - (arTotal * 0.15) + (apEstimated * 0.12);
  }, [last.ebitda, arTotal, apEstimated]);
  
  const investingCashFlow = useMemo(() => -45_000, []); // Mock capex
  const financingCashFlow = useMemo(() => 0, []); // No debt/equity changes
  const netCashFlow = useMemo(() => operatingCashFlow + investingCashFlow + financingCashFlow, [operatingCashFlow, investingCashFlow, financingCashFlow]);
  
  const cashCoverageDays = useMemo(() => {
    const dailyOpex = opexMonthly / 30;
    return dailyOpex > 0 ? cashBuffer / dailyOpex : 0;
  }, [cashBuffer, opexMonthly]);

  return {
    drillingM1,
    setDrillingM1,
    drillingGrowth,
    setDrillingGrowth,
    productM1,
    setProductM1,
    productGrowth,
    setProductGrowth,
    drillingDirectPct,
    setDrillingDirectPct,
    productCogsPct,
    setProductCogsPct,
    opexMonthly,
    setOpexMonthly,
    dso,
    setDso,
    dpo,
    setDpo,
    inventoryDays,
    setInventoryDays,
    wipScale,
    setWipScale,
    cashBuffer,
    setCashBuffer,
    monthlyPurchases,
    setMonthlyPurchases,
    vatRate,
    setVatRate,
    vatOnTradeOnly,
    setVatOnTradeOnly,
    vatRecoveryPct,
    setVatRecoveryPct,
    rows,
    cumulativeEbitda,
    last,
    arTotal,
    arAging,
    apEstimated,
    inventoryEstimated,
    wipEstimated,
    taxableSales,
    vatOutput,
    vatInput,
    netVatPosition,
    currentAssets,
    currentLiabilities,
    opexBreakdownList,
    opexChartRow,
    bridgeSteps,
    // Financial Ratios
    currentRatio,
    quickRatio,
    grossMarginPct,
    netMarginPct,
    inventoryTurnover,
    // Cash Flow
    operatingCashFlow,
    investingCashFlow,
    financingCashFlow,
    netCashFlow,
    cashCoverageDays,
  };
}

export type AccountingDemoState = ReturnType<typeof useAccountingDemoState>;
