"use client";

import { InteractiveFlowCycle } from "./InteractiveFlowCycle";
import { purchaseDetails, purchaseSteps } from "@/lib/document-cycle-data";

export function DocumentCycleVisual() {
  return (
    <InteractiveFlowCycle
      topNote="ثم ترحيل المخزون أو الذمة حسب سياسة المنشأة"
      steps={purchaseSteps}
      details={purchaseDetails}
    />
  );
}
