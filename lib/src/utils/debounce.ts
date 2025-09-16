/**
 * Creates a debounced function that delays invoking the provided function until 
 * after `delay` milliseconds have elapsed since the last time the debounced 
 * function was invoked. The debounced function comes with a `flush` method to 
 * immediately invoke any pending function calls. Handles both synchronous and 
 * asynchronous functions.
 *
 * @param fn - The function to debounce (can be sync or async)
 * @param delay - The number of milliseconds to delay (defaults to 300ms)
 * @returns A debounced version of the function with a `flush` method
 */
export function debounce<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn | Promise<TReturn>,
  delay = 300
): ((...args: TArgs) => Promise<TReturn | undefined>) & { flush: () => Promise<TReturn | undefined> } {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let isAsync: boolean | undefined;
  let lastArgs: TArgs | undefined;

  const execute = async (): Promise<TReturn | undefined> => {
    if (!lastArgs) return undefined;

    const args = lastArgs;
    lastArgs = undefined;

    const result = fn(...args);
    
    // Check if the function returns a promise on first call
    if (isAsync === undefined) {
      isAsync = result instanceof Promise;
    }
    
    if (isAsync) {
      const asyncResult = await result;
      return asyncResult;
    } else {
      return result as TReturn;
    }
  };

  const debounced = (...args: TArgs): Promise<TReturn | undefined> => {
    return new Promise((resolve, reject) => {
      lastArgs = args;

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        try {
          const result = await execute();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };

  debounced.flush = (): Promise<TReturn | undefined> => {
    return new Promise((resolve, reject) => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }

      execute()
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  };

  return debounced;
}