export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 border-zinc-700 border-t-accent rounded-full animate-spin`}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-zinc-400">جاري التحميل...</p>
      </div>
    </div>
  );
}
