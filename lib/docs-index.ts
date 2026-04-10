export type DocIndexItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

export const DOCS_INDEX: DocIndexItem[] = [
  {
    id: "chart-of-accounts",
    title: "دليل الحسابات",
    description: "هيكل الحسابات الكامل، أمثلة قيود، تصنيفات (أصول، خصوم، إيرادات، مصاريف)",
    tags: ["أساسي", "محاسبة"],
  },
  {
    id: "job-costing-guide",
    title: "تكلفة الوظائف (Job Costing)",
    description: "كيفية تتبع تكلفة مشاريع الحفر، أعمال تحت التنفيذ (WIP), نقل التكلفة عند الاكتمال",
    tags: ["مشاريع", "تكاليف"],
  },
  {
    id: "monthly-close",
    title: "دورة المحاسبة الشهرية",
    description: "قائمة مراجعة للإقفال الشهري، خطوات بالترتيب، مسؤوليات الفريق",
    tags: ["إقفال", "عمليات"],
  },
  {
    id: "inventory",
    title: "المخزون والتقييم",
    description: "طرق التقييم (متوسط مرجح، FIFO)، الجرد الدوري، معالجة الفروقات",
    tags: ["مخزون", "تقييم"],
  },
  {
    id: "tax-compliance",
    title: "الضرائب والامتثال",
    description: "ضريبة القيمة المضافة، ضريبة الاستقطاع، الزكاة، الفوترة الإلكترونية (ZATCA)",
    tags: ["ضرائب", "امتثال"],
  },
  {
    id: "cash-management",
    title: "التدفق النقدي ورأس المال العامل",
    description: "الفرق بين الربح والنقد، دورة التحويل النقدي، سياسات التحصيل والدفع",
    tags: ["نقد", "سيولة"],
  },
  {
    id: "glossary",
    title: "معجم المصطلحات",
    description: "مصطلحات محاسبية ومالية بالعربية والإنجليزية مع شرح مختصر",
    tags: ["مرجع", "مبتدئين"],
  },
  {
    id: "user-guide",
    title: "دليل المستخدم",
    description: "كيفية استخدام اللوحة التنفيذية، الرؤى، المحاكاة، والطباعة والتصدير",
    tags: ["دليل", "بوابة"],
  },
  {
    id: "faq",
    title: "الأسئلة الشائعة",
    description: "إجابات عن الضريبة، النقد، تكلفة المشاريع، والموازنة",
    tags: ["أسئلة", "مساعدة"],
  },
];

export const ALLOWED_DOC_IDS = new Set(DOCS_INDEX.map((d) => d.id));
