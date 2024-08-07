// utils.ts

/**
 * Formats a Date object into a human-readable string.
 * @param date - The Date object to format.
 * @param options - Options to customize the format.
 * @returns A formatted date string.
 */
export function formatDate(date: Date, options: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
