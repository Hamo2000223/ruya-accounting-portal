"use client";

import { InteractiveFlowCycle } from "./InteractiveFlowCycle";
import { salesDetails, salesSteps } from "@/lib/document-cycle-data";

export function SalesCycleVisual() {
  return (
    <InteractiveFlowCycle
      topNote="من التزام العميل إلى التحصيل — مع مراعاة الفوترة والضريبة"
      steps={salesSteps}
      details={salesDetails}
      lastStroke="#f472b6"
    />
  );
}
