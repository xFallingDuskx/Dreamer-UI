/**
 * Joins an array of strings, filtering out any undefined or null values.
 * Primarily used to join class names.
 *
 * @param args - The strings to join.
 * @returns The joined string or `undefined` if no valid strings are provided.
 */
export function join(...args: Array<string | boolean | undefined | null>): string | undefined {
  const classes = args
    .filter((arg) => typeof arg === 'string' && arg)
    .join(' ')
    .trim();

  return classes || undefined;
}
