export const FEELING_OPTIONS = ["Triste","Ansioso","Estressado","Calmo","Outro"] as const;
export type FeelingOption = typeof FEELING_OPTIONS[number];

export const REASONS_OPTIONS = [
  "Ansiedade",
  "Depressão",
  "Estresse",
  "Dificuldade para dormir",
  "Problemas de relacionamento",
  "Outro"
] as const;
export type ReasonOption = typeof REASONS_OPTIONS[number];

export const FREQ_OPTIONS = ["Sempre","Frequentemente","Às vezes","Raramente","Nunca"] as const;
export type FrequencyOption = typeof FREQ_OPTIONS[number];

export type TriageAnswers = {
  feelingToday: FeelingOption | "";
  feelingOtherText?: string;
  hadTherapyBefore: boolean;
  therapyDuration?: string;
  reasons: ReasonOption[];
  reasonsOtherText?: string;
  takingMeds: boolean;
  medsWhich?: string;
  selfHarmThoughts: boolean;
  overwhelmFrequency: FrequencyOption;
  hasSomeoneToTalk: boolean;
  age: number | undefined;
}; 