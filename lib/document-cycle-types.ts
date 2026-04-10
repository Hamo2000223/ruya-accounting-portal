export type CycleStepDetail = {
  title: string;
  description: string;
  documents: string[];
  journalEntry: string;
  responsible: string;
  bestPractices: string;
};

export type FlowStep = {
  id: number;
  title: string;
  line2: string;
  line3: string;
};

export type CycleMeta = {
  overview: string;
  goals: string[];
  warnings: string[];
  example: string;
  commonMistakes: string[];
  journalNotes: string;
};
