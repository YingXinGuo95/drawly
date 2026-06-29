import type { BirthdayEntry, DateFormat, ZodiacSign } from "./types";

/**
 * Cryptographically secure random integer: [0, max)
 */
function secureRandomInt(max: number): number {
  if (max <= 0) return 0;
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    return Math.floor((buf[0] / 2 ** 32) * max);
  }
  return Math.floor(Math.random() * max);
}

const ZODIAC_SIGNS: Array<{
  sign: ZodiacSign;
  month: number;
  day: number;
}> = [
  { sign: { name: "Capricorn", emoji: "♑" }, month: 1, day: 19 },
  { sign: { name: "Aquarius", emoji: "♒" }, month: 2, day: 18 },
  { sign: { name: "Pisces", emoji: "♓" }, month: 3, day: 20 },
  { sign: { name: "Aries", emoji: "♈" }, month: 4, day: 19 },
  { sign: { name: "Taurus", emoji: "♉" }, month: 5, day: 20 },
  { sign: { name: "Gemini", emoji: "♊" }, month: 6, day: 20 },
  { sign: { name: "Cancer", emoji: "♋" }, month: 7, day: 22 },
  { sign: { name: "Leo", emoji: "♌" }, month: 8, day: 22 },
  { sign: { name: "Virgo", emoji: "♍" }, month: 9, day: 22 },
  { sign: { name: "Libra", emoji: "♎" }, month: 10, day: 22 },
  { sign: { name: "Scorpio", emoji: "♏" }, month: 11, day: 21 },
  { sign: { name: "Sagittarius", emoji: "♐" }, month: 12, day: 21 },
];

/**
 * Get zodiac sign for a given date.
 */
export function getZodiac(date: Date): ZodiacSign {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  for (const entry of ZODIAC_SIGNS) {
    if (month < entry.month || (month === entry.month && day <= entry.day)) {
      return entry.sign;
    }
  }
  // Default: Capricorn (Dec 22 - Jan 19)
  return ZODIAC_SIGNS[0].sign;
}

/**
 * Generate a single random birthday within the given age range.
 *
 * minAge/maxAge define how old the person should be *today*,
 * so the birth date is computed relative to the current date.
 */
export function generateBirthday(minAge: number, maxAge: number): Date {
  const now = new Date();

  // Birth year range
  const minYear = now.getFullYear() - maxAge;
  const maxYear = now.getFullYear() - minAge;

  const year = minYear + secureRandomInt(maxYear - minYear + 1);
  const month = secureRandomInt(12); // 0-indexed
  // Days in month (consider leap years)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const day = secureRandomInt(daysInMonth) + 1;

  return new Date(year, month, day);
}

/**
 * Format a date according to the specified format.
 */
export function formatDate(date: Date, format: DateFormat): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "Month DD, YYYY":
      return `${MONTH_NAMES[date.getMonth()]} ${day}, ${year}`;
    case "YYYY":
      return String(year);
  }
}

/**
 * Generate N random birthdays.
 */
export function generateBirthdays(
  count: number,
  minAge: number,
  maxAge: number,
  format: DateFormat,
  showZodiac: boolean,
): BirthdayEntry[] {
  const results: BirthdayEntry[] = [];
  for (let i = 0; i < count; i++) {
    const date = generateBirthday(minAge, maxAge);
    results.push({
      date,
      formatted: formatDate(date, format),
      zodiac: showZodiac ? getZodiac(date) : { name: "", emoji: "" },
    });
  }
  return results;
}

/**
 * Generate a plain text representation of birthdays.
 */
export function birthdaysToText(
  entries: BirthdayEntry[],
  showZodiac: boolean,
): string {
  return entries
    .map((e, i) => {
      const zodiac = showZodiac ? ` (${e.zodiac.name}, ${e.zodiac.emoji})` : "";
      return `${i + 1}. ${e.formatted}${zodiac}`;
    })
    .join("\n");
}

/**
 * Generate CSV content.
 */
export function birthdaysToCSV(entries: BirthdayEntry[]): string {
  const header = "Index,Birthday,Year,Month,Day";
  const rows = entries.map(
    (e, i) =>
      `${i + 1},${e.formatted},${e.date.getFullYear()},${e.date.getMonth() + 1},${e.date.getDate()}`,
  );
  return [header, ...rows].join("\n");
}

/**
 * Generate JSON content.
 */
export function birthdaysToJSON(entries: BirthdayEntry[]): string {
  const data = entries.map((e) => ({
    index: entries.indexOf(e) + 1,
    birthday: e.formatted,
    year: e.date.getFullYear(),
    month: e.date.getMonth() + 1,
    day: e.date.getDate(),
  }));
  return JSON.stringify(data, null, 2);
}
