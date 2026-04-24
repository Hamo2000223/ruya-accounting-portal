"use client";

import { InteractiveFlowCycle } from "./InteractiveFlowCycle";
import { payrollDetails, payrollSteps } from "@/lib/document-cycle-data";

export function PayrollCycleVisual() {
  return (
    <InteractiveFlowCycle
      topNote="فصل واجبات: إدخال ≠ اعتماد ≠ صرف"
      steps={payrollSteps}
      details={payrollDetails}
      lastStroke="#fbbf24"
    />
  );
}
