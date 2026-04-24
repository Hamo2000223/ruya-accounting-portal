"use client";

import { InteractiveFlowCycle } from "./InteractiveFlowCycle";
import { fixedAssetsDetails, fixedAssetsSteps } from "@/lib/document-cycle-data";

export function FixedAssetsCycleVisual() {
  return (
    <InteractiveFlowCycle
      topNote="من الطلب حتى الاستهلاك — رأس مال وليس مصروف يومي"
      steps={fixedAssetsSteps}
      details={fixedAssetsDetails}
      lastStroke="#a78bfa"
    />
  );
}
