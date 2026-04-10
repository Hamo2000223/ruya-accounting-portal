# رؤى محاسبية — موقع كامل للعميل

موقع محاسبي شامل ومبسّط بالعربية — جاهز للعرض على العميل. يتضمن **أربع وحدات رئيسية**:

## الوحدات

### 1. لوحة الرؤى المحاسبية (`/ruya`)
- **الجانب الخارجي**: ذمم مدينة، إيراد، ضريبة مخرجات
- **الجانب الداخلي**: موردون، مخزون، أعمال تحت التنفيذ
- **المصاريف التشغيلية**: توزيع حسب البند
- **التقارير**: جسر من الإيراد إلى الربح التشغيلي

### 2. المحاكاة المالية (`/playground`)
- منزلقات تفاعلية لاختبار سيناريوهات الإيراد والتكلفة
- مخططات: إيراد شهري، هامش إجمالي، ربح تشغيلي
- موقف ضريبي تبسيطي
- تراكم الربح على ١٢ شهراً

### 3. دورة المستندات (`/visuals`)
- رسم توضيحي: أمر شراء ← استلام ← فاتورة مورد
- للتدريب والضبط الداخلي

### 4. الدليل المحاسبي (`/docs`)
- التصميم المحاسبي (دليل حسابات، تكلفة الوظائف)
- الدليل المالي والتدفقات
- الامتثال السعودي (زكاة، فوترة، عمالة)

## التقنيات

- **Next.js 15** + React 19 + TypeScript
- **Tailwind CSS 3** (تصميم داكن عصري)
- **Recharts** (مخططات تفاعلية)
- **Noto Sans Arabic** (خط عربي واضح)
- **RTL** (اتجاه يمين لليسار)

## التشغيل المحلي

```bash
cd portal
npm install
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000)

## النشر على GitHub ثم Vercel

### 1) رفع المشروع إلى GitHub

> المستودع هنا يفترض أن **جذر Git = مجلد `portal`** (يحتوي على `package.json`).

1. أنشئ مستودعاً جديداً على [github.com/new](https://github.com/new) (بدون README إن كان المجلد المحلي جاهزاً).
2. من PowerShell داخل مجلد `portal`:

**طريقة أ — سكربت (يتطلب تسجيل دخول مرة واحدة):**

```powershell
cd "مسار\مجلد\portal"
# 1) ثبّت GitHub CLI إن لزم: winget install GitHub.cli
# 2) سجّل الدخول (متصفح أو رمز):
& "$env:ProgramFiles\GitHub CLI\gh.exe" auth login
# 3) أنشئ المستودع وادفع (غيّر الاسم إن كان مأخوذاً):
.\scripts\push-to-github.ps1 -RepoName "اسم-مستودعك"
# مستودع خاص:
.\scripts\push-to-github.ps1 -RepoName "اسم-مستودعك" -Private
```

**طريقة ب — يدوياً:**

```bash
git init
git add .
git commit -m "Initial commit: accounting portal (Next.js)"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

استبدل `USERNAME` و`REPO_NAME` باسم حسابك ومستودعك. إذا طُلب تسجيل الدخول، استخدم **Personal Access Token** كلمة مرور GitHub بدلاً من كلمة مرور الحساب، أو استخدم [GitHub Desktop](https://desktop.github.com/).

### 2) النشر على Vercel

1. سجّل الدخول إلى [vercel.com](https://vercel.com) (يمكن «Continue with GitHub»).
2. **Add New… → Project** واختر المستودع الذي رفعته.
3. إذا كان جذر المشروع في Git هو نفسه مجلد Next (كما في الخطوات أعلاه): اترك **Root Directory** فارغاً أو `.`
4. إطار العمل **Next.js** يُكتشف تلقائياً:
   - **Build Command:** `npm run build`
   - **Output:** يضبطه Vercel تلقائياً
5. اضغط **Deploy**. بعد الدقيقة الأولى ستحصل على رابط مثل `https://your-project.vercel.app`.

### إذا كان المستودع على المجلد الأب (يحتوي `portal` داخله)

في إعدادات المشروع على Vercel: **Root Directory** = `portal`

### مواقع أخرى

- أمر البناء: `npm run build`
- أمر التشغيل: `npm start`

## الملاحظات

- **الأرقام افتراضية** للعرض فقط — ليست قيوداً فعلية
- **الضريبة تقديرية** — يلزم مستشار ضريبي للتطبيق الفعلي
- **المحاكاة للنقاش** — لا تغني عن إقفال شهر أو مراجعة محاسبية

## الهيكل

```
portal/
├── app/                    # صفحات Next.js
│   ├── page.tsx           # الرئيسية
│   ├── ruya/              # لوحة الرؤى
│   ├── playground/        # المحاكاة
│   ├── visuals/           # دورة المستندات
│   └── docs/              # الدليل
├── components/            # مكونات قابلة لإعادة الاستخدام
│   ├── AccountingInsightsHub.tsx
│   ├── ExternalInsights.tsx
│   ├── InternalInsights.tsx
│   ├── OpexBreakdown.tsx
│   ├── ReportingBridge.tsx
│   ├── FinancialPlayground.tsx
│   ├── DocumentCycleVisual.tsx
│   ├── SliderField.tsx
│   ├── SiteHeader.tsx
│   └── SiteFooter.tsx
└── lib/                   # منطق ومساعدات
    ├── useAccountingDemoState.ts
    └── format-sar.ts
```

## للتخصيص

- **الألوان**: عدّل `tailwind.config.ts`
- **الخط**: عدّل `app/layout.tsx`
- **البيانات الافتراضية**: عدّل `lib/useAccountingDemoState.ts`
- **المحتوى**: عدّل الصفحات في `app/`

---

**جاهز للعرض على العميل 🎉**
