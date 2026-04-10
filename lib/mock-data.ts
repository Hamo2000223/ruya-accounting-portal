import type { Customer, Vendor, Project, BudgetLine, ComplianceItem } from "./types";

export const MOCK_CUSTOMERS: Customer[] = [
  { id: "C001", name: "شركة أرامكو السعودية", arBalance: 2_450_000, daysOverdue: 45, status: "watch", segment: "government" },
  { id: "C002", name: "شركة الكهرباء السعودية", arBalance: 1_820_000, daysOverdue: 35, status: "good", segment: "government" },
  { id: "C003", name: "مجموعة بن لادن", arBalance: 890_000, daysOverdue: 125, status: "critical", segment: "private" },
  { id: "C004", name: "شركة سابك", arBalance: 1_150_000, daysOverdue: 28, status: "good", segment: "mixed" },
  { id: "C005", name: "مؤسسة النفط الوطنية", arBalance: 620_000, daysOverdue: 18, status: "good", segment: "government" },
];

export const MOCK_VENDORS: Vendor[] = [
  { id: "V001", name: "شركة المعدات الثقيلة", apBalance: 580_000, avgDpo: 42, relationship: "excellent" },
  { id: "V002", name: "مورد قطع الغيار الرئيسي", apBalance: 320_000, avgDpo: 38, relationship: "good" },
  { id: "V003", name: "شركة الخرسانة والإسمنت", apBalance: 195_000, avgDpo: 30, relationship: "good" },
  { id: "V004", name: "مورد الكيماويات", apBalance: 142_000, avgDpo: 45, relationship: "excellent" },
  { id: "V005", name: "شركة النقل واللوجستيات", apBalance: 88_000, avgDpo: 28, relationship: "fair" },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "P001",
    jobNumber: "DR-2026-003",
    name: "حفر بئر استكشافي — الربع الخالي",
    client: "أرامكو السعودية",
    region: "الشرقية",
    status: "active",
    revenue: 3_200_000,
    cost: 1_920_000,
    margin: 1_280_000,
    marginPercent: 40,
    percentComplete: 65,
    startDate: "2026-01-15",
    collectionStatus: "pending",
  },
  {
    id: "P002",
    jobNumber: "DR-2026-001",
    name: "حفر إنتاجي — الغوار",
    client: "شركة الكهرباء",
    region: "الشرقية",
    status: "completed",
    revenue: 2_800_000,
    cost: 1_540_000,
    margin: 1_260_000,
    marginPercent: 45,
    percentComplete: 100,
    startDate: "2025-11-01",
    endDate: "2026-03-20",
    collectionStatus: "paid",
  },
  {
    id: "P003",
    jobNumber: "DR-2026-005",
    name: "صيانة آبار — منطقة القصيم",
    client: "مجموعة بن لادن",
    region: "القصيم",
    status: "active",
    revenue: 950_000,
    cost: 665_000,
    margin: 285_000,
    marginPercent: 30,
    percentComplete: 42,
    startDate: "2026-02-10",
    collectionStatus: "overdue",
  },
  {
    id: "P004",
    jobNumber: "DR-2025-012",
    name: "حفر استكشافي — الحدود الشمالية",
    client: "سابك",
    region: "الحدود الشمالية",
    status: "completed",
    revenue: 1_680_000,
    cost: 890_000,
    margin: 790_000,
    marginPercent: 47,
    percentComplete: 100,
    startDate: "2025-10-05",
    endDate: "2026-01-28",
    collectionStatus: "paid",
  },
  {
    id: "P005",
    jobNumber: "DR-2026-007",
    name: "حفر مياه جوفية — تبوك",
    client: "النفط الوطنية",
    region: "تبوك",
    status: "active",
    revenue: 720_000,
    cost: 432_000,
    margin: 288_000,
    marginPercent: 40,
    percentComplete: 28,
    startDate: "2026-03-12",
    collectionStatus: "pending",
  },
];

export const MOCK_BUDGET: BudgetLine[] = [
  { category: "إيراد الحفر", budgeted: 950_000, actual: 1_020_000, variance: 70_000, variancePercent: 7.4 },
  { category: "إيراد التجارة", budgeted: 280_000, actual: 245_000, variance: -35_000, variancePercent: -12.5 },
  { category: "تكلفة مباشرة حفر", budgeted: 522_500, actual: 561_000, variance: -38_500, variancePercent: -7.4 },
  { category: "تكلفة بضاعة مباعة", budgeted: 196_000, actual: 171_500, variance: 24_500, variancePercent: 12.5 },
  { category: "رواتب وتأمينات", budgeted: 133_000, actual: 138_200, variance: -5_200, variancePercent: -3.9 },
  { category: "إيجار معدات", budgeted: 57_000, actual: 54_800, variance: 2_200, variancePercent: 3.9 },
  { category: "صيانة", budgeted: 57_000, actual: 62_100, variance: -5_100, variancePercent: -8.9 },
  { category: "نقل", budgeted: 45_600, actual: 43_900, variance: 1_700, variancePercent: 3.7 },
  { category: "إدارة", budgeted: 49_400, actual: 51_200, variance: -1_800, variancePercent: -3.6 },
  { category: "سلامة وتدريب", budgeted: 38_000, actual: 35_600, variance: 2_400, variancePercent: 6.3 },
];

export const MOCK_COMPLIANCE: ComplianceItem[] = [
  {
    id: "CP001",
    type: "vat",
    title: "إقرار ضريبة القيمة المضافة — الربع الأول 2026",
    dueDate: "2026-04-30",
    status: "pending",
    description: "إقرار ربع سنوي — المبيعات والمشتريات للأشهر 1-3",
  },
  {
    id: "CP002",
    type: "zakat",
    title: "إقرار الزكاة السنوي 2025",
    dueDate: "2026-05-31",
    status: "draft",
    description: "إقرار زكاة على وعاء السنة المالية 2025",
  },
  {
    id: "CP003",
    type: "withholding",
    title: "ضريبة الاستقطاع — مارس 2026",
    dueDate: "2026-04-10",
    status: "overdue",
    description: "استقطاع على خدمات استشارية ومهنية",
  },
  {
    id: "CP004",
    type: "license",
    title: "تجديد رخصة البلدية — فرع الرياض",
    dueDate: "2026-06-15",
    status: "pending",
    description: "تجديد سنوي لموقع المستودع",
  },
  {
    id: "CP005",
    type: "vat",
    title: "إقرار ضريبة القيمة المضافة — فبراير 2026",
    dueDate: "2026-03-31",
    status: "submitted",
    description: "إقرار شهري — مقدّم في الموعد",
  },
];

export function getCustomersByStatus(status: Customer["status"]) {
  return MOCK_CUSTOMERS.filter((c) => c.status === status);
}

export function getProjectsByStatus(status: Project["status"]) {
  return MOCK_PROJECTS.filter((p) => p.status === status);
}

export function getUpcomingCompliance(daysAhead = 30) {
  const now = new Date();
  const ahead = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  return MOCK_COMPLIANCE.filter((c) => {
    const due = new Date(c.dueDate);
    return due >= now && due <= ahead && c.status !== "submitted";
  });
}
