/**
 * Creates a debounced function that delays invoking the provided function until 
 * after `delay` milliseconds have elapsed since the last time the debounced 
 * function was invoked. Handles both synchronous and asynchronous functions.
 *
 * @param fn - The function to debounce (can be sync or async)
 * @param delay - The number of milliseconds to delay (defaults to 300ms)
 * @returns A debounced version of the function
 */
export function debounce<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn | Promise<TReturn>,
  delay = 300
): (...args: TArgs) => Promise<TReturn> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let isAsync: boolean | undefined;

  return (...args: TArgs): Promise<TReturn> => {
    return new Promise((resolve, reject) => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        try {
          const result = fn(...args);
          
          // Check if the function returns a promise on first call
          if (isAsync === undefined) {
            isAsync = result instanceof Promise;
          }
          
          if (isAsync) {
            const asyncResult = await result;
            resolve(asyncResult);
          } else {
            resolve(result as TReturn);
          }
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}