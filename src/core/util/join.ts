/**
 * Joins an array of strings, filtering out any undefined or null values.
 * Primarily used to join class names.
 *
 * @param args - The strings to join.
 * @returns The joined string.
 */
export function join(...args: Array<string | undefined | null>): string {
  return args.filter(Boolean).join(' ').trim();
}
