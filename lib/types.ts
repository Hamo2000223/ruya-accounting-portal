export type Customer = {
  id: string;
  name: string;
  arBalance: number;
  daysOverdue: number;
  status: "good" | "watch" | "critical";
  segment: "government" | "private" | "mixed";
};

export type Vendor = {
  id: string;
  name: string;
  apBalance: number;
  avgDpo: number;
  relationship: "excellent" | "good" | "fair";
};

export type Project = {
  id: string;
  jobNumber: string;
  name: string;
  client: string;
  region: string;
  status: "active" | "completed" | "on-hold";
  revenue: number;
  cost: number;
  margin: number;
  marginPercent: number;
  percentComplete: number;
  startDate: string;
  endDate?: string;
  collectionStatus: "paid" | "pending" | "overdue";
};

export type BudgetLine = {
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
};

export type ComplianceItem = {
  id: string;
  type: "vat" | "zakat" | "withholding" | "license" | "other";
  title: string;
  dueDate: string;
  status: "submitted" | "pending" | "overdue" | "draft";
  description: string;
};

export type CashFlowLine = {
  category: string;
  type: "operating" | "investing" | "financing";
  amount: number;
};

export type FinancialRatio = {
  name: string;
  value: number;
  unit: "ratio" | "percent" | "days";
  category: "liquidity" | "profitability" | "efficiency" | "leverage";
  trend: "up" | "down" | "stable";
  benchmark?: number;
  interpretation: string;
};
