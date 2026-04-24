"use client";

import { formatSAR } from "@/lib/format-sar";

type Props = {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  format?: "sar" | "percent" | "raw";
};

export function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix = "",
  format = "sar",
}: Props) {
  const display =
    format === "percent"
      ? `${value}٪`
      : format === "raw"
        ? `${value}${suffix}`
        : formatSAR(value);

  return (
    <label className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-surface-raised/50 p-3">
      <span className="text-xs font-medium text-zinc-300">{label}</span>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2 flex-1 cursor-pointer accent-accent"
        />
        <span className="min-w-[5rem] text-end font-mono text-sm text-accent" dir="ltr">
          {display}
        </span>
      </div>
    </label>
  );
}
