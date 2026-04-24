"use client";

import { InteractiveFlowCycle } from "./InteractiveFlowCycle";
import { expenseDetails, expenseSteps } from "@/lib/document-cycle-data";

export function ExpenseCycleVisual() {
  return (
    <InteractiveFlowCycle
      topNote="كل صرف مبرر بمستند وميزانية واعتماد"
      steps={expenseSteps}
      details={expenseDetails}
      lastStroke="#34d399"
    />
  );
}
