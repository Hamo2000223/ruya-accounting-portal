"use client";

import { useId, useState } from "react";
import type { CycleStepDetail, FlowStep } from "@/lib/document-cycle-types";
import { CycleStepModal } from "./CycleStepModal";

type Props = {
  topNote: string;
  steps: FlowStep[];
  details: Record<number, CycleStepDetail>;
  accentStroke?: string;
  lastStroke?: string;
};

export function InteractiveFlowCycle({
  topNote,
  steps,
  details,
  accentStroke = "#22d3ee",
  lastStroke = "#818cf8",
}: Props) {
  const uid = useId().replace(/:/g, "");
  const gradId = `stepGrad-${uid}`;
  const arrowId = `arrowHead-${uid}`;
  const [activeId, setActiveId] = useState<number | null>(null);

  const n = steps.length;
  const padding = 24;
  const boxW = Math.min(200, Math.floor((720 - padding * 2 - (n - 1) * 24) / n));
  const gap = 24;
  const totalW = padding * 2 + n * boxW + (n - 1) * gap;
  const viewH = 200;
  const boxY = 56;
  const boxH = 88;
  const cy = boxY + boxH / 2;

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-surface-raised/40 p-4 sm:p-8" dir="rtl">
        <p className="mb-4 text-center text-xs text-zinc-500 sm:text-sm">انقر على أي خطوة لعرض التفاصيل</p>
        <svg viewBox={`0 0 ${totalW} ${viewH}`} className="mx-auto h-auto w-full min-w-[640px] max-w-full">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#115e59" stopOpacity="0.55" />
            </linearGradient>
            <marker id={arrowId} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#71717a" />
            </marker>
          </defs>

          <text x={totalW / 2} y="28" textAnchor="middle" fill="#a1a1aa" fontSize="12" fontFamily="system-ui,sans-serif">
            {topNote}
          </text>

          {steps.map((step, i) => {
            const x = padding + i * (boxW + gap);
            const isLast = i === n - 1;
            const stroke = isLast ? lastStroke : accentStroke;
            const cx = x + boxW / 2;

            return (
              <g key={step.id}>
                {i < n - 1 && (
                  <line
                    x1={x + boxW}
                    y1={cy}
                    x2={x + boxW + gap - 8}
                    y2={cy}
                    stroke="#71717a"
                    strokeWidth="2"
                    markerEnd={`url(#${arrowId})`}
                  />
                )}
                <rect
                  x={x}
                  y={boxY}
                  width={boxW}
                  height={boxH}
                  rx="14"
                  fill={`url(#${gradId})`}
                  stroke={stroke}
                  strokeWidth="1.5"
                  className="cursor-pointer transition hover:opacity-90"
                  onClick={() => setActiveId(step.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveId(step.id);
                    }
                  }}
                  aria-label={`تفاصيل: ${step.title}`}
                />
                <text
                  x={cx}
                  y={boxY + 32}
                  textAnchor="middle"
                  fill="#ecfdf5"
                  fontSize={boxW < 160 ? 13 : 15}
                  fontWeight="600"
                  fontFamily="system-ui,sans-serif"
                  className="pointer-events-none"
                >
                  {step.title}
                </text>
                <text
                  x={cx}
                  y={boxY + 54}
                  textAnchor="middle"
                  fill="#99f6e4"
                  fontSize="10"
                  fontFamily="system-ui,sans-serif"
                  className="pointer-events-none"
                >
                  {step.line2}
                </text>
                <text
                  x={cx}
                  y={boxY + 72}
                  textAnchor="middle"
                  fill="#5eead4"
                  fontSize="9"
                  fontFamily="system-ui,sans-serif"
                  className="pointer-events-none"
                >
                  {step.line3}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <CycleStepModal
        open={activeId !== null}
        onClose={() => setActiveId(null)}
        detail={activeId !== null ? details[activeId] ?? null : null}
      />
    </>
  );
}
