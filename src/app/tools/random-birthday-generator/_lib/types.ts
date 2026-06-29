export type DateFormat =
  | "YYYY-MM-DD"
  | "MM/DD/YYYY"
  | "DD/MM/YYYY"
  | "Month DD, YYYY"
  | "YYYY";

export interface ZodiacSign {
  name: string;
  emoji: string;
}

export interface BirthdayEntry {
  date: Date;
  formatted: string;
  zodiac: ZodiacSign;
}

export interface GeneratorConfig {
  count: number;
  minAge: number;
  maxAge: number;
  format: DateFormat;
  showZodiac: boolean;
}

export interface SharePayload {
  v: 1;
  c: number;
  a: number;
  f: DateFormat;
  z: boolean;
  d: string[]; // ISO date strings
}
