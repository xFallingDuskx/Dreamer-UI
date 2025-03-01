/**
 * Joins an array of strings, filtering out any undefined or null values.
 * Primarily used to join class names.
 *
 * @param args - The strings to join.
 * @returns The joined string.
 */
export function join(...args: Array<string | boolean | undefined | null>): string {
  return args
    .filter((arg) => typeof arg === 'string' && arg)
    .join(' ')
    .trim();
}
