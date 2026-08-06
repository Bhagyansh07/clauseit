export type Language = "en" | "hi";

export interface Bilingual {
  en: string;
  hi: string;
}

export interface Risk {
  level: "low" | "medium" | "high";
  score: number;
  reason: Bilingual;
}

export interface Section {
  heading: string;
  plainMeaning: Bilingual;
}

export type FlagType =
  | "hidden_clause"
  | "unfair_charge"
  | "penalty"
  | "auto_renewal"
  | "liability"
  | "other";

export type Severity = "info" | "warning" | "danger";

export interface Flag {
  type: FlagType;
  quote: string;
  explanation: Bilingual;
  severity: Severity;
}

export interface Charge {
  name: string;
  amount: string;
  frequency: string;
  note: Bilingual;
}

export interface ImportantDate {
  label: string;
  date: string;
  action: string;
  note: Bilingual;
}

export interface Analysis {
  language: string;
  summary: Bilingual;
  risk: Risk;
  sections: Section[];
  flags: Flag[];
  charges: Charge[];
  dates: ImportantDate[];
}
