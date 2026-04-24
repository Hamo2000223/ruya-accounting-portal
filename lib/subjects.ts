export type Subject = {
  slug: string;
  title: string;
  shortDescription: string;
  tags: string[];
  /** وحدات مرجعية شائعة لثانوي عام أدبي (مصر) — قابلة للتحرير في المحتوى */
  units: string[];
  reviewDocId: string;
};

export const SUBJECTS: Subject[] = [
  {
    slug: "history",
    title: "التاريخ",
    shortDescription:
      "مراجعة موجزة لمسارات شائعة في تاريخ مصر والعالم — خط زمني، مفاهيم، ونصائح للمذاكرة والامتحان.",
    tags: ["تاريخ", "ثانوي أدبي", "مصر"],
    units: [
      "مصر القديمة والعصور الوسطى — مفاهيم أساسية",
      "العصر الحديث المبكر في مصر وأوروبا",
      "الثورات والحركات الوطنية في مصر",
      "الحربان العالميتان والشرق الأوسط",
      "تقسيم زمني وخرائط ذهنية للمراجعة",
    ],
    reviewDocId: "history-review",
  },
  {
    slug: "english",
    title: "اللغة الإنجليزية",
    shortDescription:
      "قواعد، مفردات، قراءة وكتابة — إطار مراجعة مناسب لطلاب الشهادة الثانوية الأدبية.",
    tags: ["إنجليزي", "لغات", "ثانوي"],
    units: [
      "Tenses والأزمنة والتركيب",
      "Active / Passive والشرط والمودالز",
      "Reading comprehension — استراتيجيات",
      "Writing: براجراف وفقرات مترابطة",
      "Translation والتعبير عن المعنى بدقة",
    ],
    reviewDocId: "english-review",
  },
  {
    slug: "geography",
    title: "الجغرافيا",
    shortDescription:
      "جغرافيا طبيعية وبشرية وموارد — مع تركيز على مهارات الخرائط والتحليل.",
    tags: ["جغرافيا", "خرائط", "ثانوي"],
    units: [
      "المناخ والغلاف الجوي والأقاليم المناخية",
      "السكان والتخطيط والتنمية",
      "الموارد والأنشطة الاقتصادية",
      "جغرافيا مصر والوطن العربي — نظرة مرجعية",
      "قراءة الخرائط والإحداثيات والمقاييس",
    ],
    reviewDocId: "geography-review",
  },
  {
    slug: "arabic",
    title: "اللغة العربية",
    shortDescription:
      "نحو وبلاغة وأدب ونصوص — مفاتيح المراجعة لطلاب القسم الأدبي.",
    tags: ["عربي", "نحو", "أدب"],
    units: [
      "الإعراب والأساليب النحوية الشائعة",
      "البلاغة: علم البيان والبديع والمعاني",
      "الأدب: عصور واتجاهات ونماذج",
      "النصوص والتلخيص والإجابة المقالية",
      "قواعد التعبير والخاطرة والرسائل",
    ],
    reviewDocId: "arabic-review",
  },
  {
    slug: "statistics",
    title: "الإحصاء",
    shortDescription:
      "إحصاء وصفي واحتمالات مبسطة — تعريفات وتمارين فكرية للمراجعة.",
    tags: ["إحصاء", "رياضة", "ثانوي أدبي"],
    units: [
      "تنظيم البيانات والجداول والرسوم البيانية",
      "الوسطيات والتشتت (المدى، التباين، الانحراف)",
      "الاحتمال الأساسي والأحداث",
      "توزيعات بسيطة وفهم القراءة الإحصائية",
      "تنبيهات شائعة في أسئلة الاختيار والمقالي",
    ],
    reviewDocId: "statistics-review",
  },
  {
    slug: "french",
    title: "اللغة الفرنسية",
    shortDescription:
      "قواعد ومفردات وقراءة — مرجع مبسط لمرحلة ثانوية أدبي.",
    tags: ["فرنسي", "لغات", "ثانوي"],
    units: [
      "Les temps (الأزمنة) والتصريف",
      "Pronoms والضمائر والتركيب",
      "Lexique thématique (موضوعات متكررة)",
      "Compréhension de texte",
      "Expression écrite — جمل بسيطة وواضحة",
    ],
    reviewDocId: "french-review",
  },
];

export const SUBJECT_BY_SLUG = Object.fromEntries(SUBJECTS.map((s) => [s.slug, s])) as Record<
  string,
  Subject
>;

export const ALLOWED_SUBJECT_SLUGS = new Set(SUBJECTS.map((s) => s.slug));

export function getSubject(slug: string): Subject | undefined {
  return SUBJECT_BY_SLUG[slug];
}
