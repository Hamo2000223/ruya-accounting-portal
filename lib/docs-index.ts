export type DocIndexItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

export const DOCS_INDEX: DocIndexItem[] = [
  {
    id: "history-review",
    title: "مراجعة التاريخ",
    description: "خط زمني، مفاهيم سياسية واجتماعية، ونصائح للمذاكرة لطلاب القسم الأدبي.",
    tags: ["تاريخ", "مراجعة"],
  },
  {
    id: "english-review",
    title: "مراجعة اللغة الإنجليزية",
    description: "قواعد أساسية، قراءة، كتابة، وترجمة — إطار عمل للمراجعة اليومية.",
    tags: ["إنجليزي", "مراجعة"],
  },
  {
    id: "geography-review",
    title: "مراجعة الجغرافيا",
    description: "مناخ، سكان، موارد، خرائط، وجغرافيا مصر والعالم — بأسلوب مبسط.",
    tags: ["جغرافيا", "مراجعة"],
  },
  {
    id: "arabic-review",
    title: "مراجعة اللغة العربية",
    description: "نحو، بلاغة، أدب، واستراتيجيات الإجابة على النصوص.",
    tags: ["عربي", "مراجعة"],
  },
  {
    id: "statistics-review",
    title: "مراجعة الإحصاء",
    description: "تنظيم بيانات، وسيطات، تشتت، واحتمالات مقدمة — للأدبي.",
    tags: ["إحصاء", "مراجعة"],
  },
  {
    id: "french-review",
    title: "مراجعة اللغة الفرنسية",
    description: "قواعد، مفردات، فهم المقروء، وتعبير بسيط ومفيد.",
    tags: ["فرنسي", "مراجعة"],
  },
  {
    id: "glossary",
    title: "معجم مصطلحات",
    description: "مصطلحات تعليمية ومفردات شائعة عبر المواد الست.",
    tags: ["مرجع", "مبتدئين"],
  },
  {
    id: "user-guide",
    title: "دليل استخدام الموقع",
    description: "كيف تتنقل بين صفحات المواد، الدليل، والبحث.",
    tags: ["دليل", "مساعدة"],
  },
  {
    id: "faq",
    title: "أسئلة شائعة",
    description: "إجابات قصيرة عن استخدام الموقع والمراجعة.",
    tags: ["أسئلة", "مساعدة"],
  },
];

export const ALLOWED_DOC_IDS = new Set(DOCS_INDEX.map((d) => d.id));
