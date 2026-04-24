export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800/80 bg-surface-raised/40 py-10">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500 sm:px-6">
        <p>
          المحتوى مرجعي للمراجعة النظرية فقط — <strong className="text-zinc-400">ليس بديلاً عن المنهج الرسمي</strong>{" "}
          أو متابعة المدرسة والمعلم.
        </p>
        <p className="mt-3 text-xs text-zinc-600">
          ثانوي عام أدبي (مصر) · واجهة عربية · يمكنك طباعة صفحات الدليل عند الحاجة (Ctrl+P).
        </p>
      </div>
    </footer>
  );
}
