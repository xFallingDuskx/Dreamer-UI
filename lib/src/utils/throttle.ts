/**
 * Creates a throttled function that only invokes the provided function at most 
 * once per every `delay` milliseconds. The throttled function comes with a 
 * `flush` method to immediately invoke any pending function calls. Handles both 
 * synchronous and asynchronous functions.
 *
 * @param fn - The function to throttle (can be sync or async)
 * @param delay - The number of milliseconds to throttle invocations to (defaults to 300ms)
 * @returns A throttled version of the function with a `flush` method
 */
export function throttle<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn | Promise<TReturn>,
  delay = 300
): ((...args: TArgs) => Promise<TReturn | undefined>) & { flush: () => Promise<TReturn | undefined> } {
  let lastExecuted = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: TArgs | undefined;
  let isAsync: boolean | undefined;
  let isExecuting = false;

  const execute = async (): Promise<TReturn | undefined> => {
    if (!lastArgs || isExecuting) return undefined;
    
    isExecuting = true;
    const args = lastArgs;
    lastArgs = undefined;

    try {
      const result = fn(...args);
      
      // Check if the function returns a promise on first call
      if (isAsync === undefined) {
        isAsync = result instanceof Promise;
      }
      
      const finalResult = isAsync ? await result : (result as TReturn);
      lastExecuted = Date.now();
      isExecuting = false;
      return finalResult;
    } catch (error) {
      isExecuting = false;
      throw error;
    }
  };

  const throttled = (...args: TArgs): Promise<TReturn | undefined> => {
    return new Promise((resolve, reject) => {
      lastArgs = args;

      const now = Date.now();
      const timeSinceLastExecution = now - lastExecuted;

      if (timeSinceLastExecution >= delay) {
        // Execute immediately
        execute()
          .then(resolve)
          .catch(reject);
      } else {
        // Schedule execution for later
        if (timeoutId !== undefined) {
          clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(() => {
          execute()
            .then(resolve)
            .catch(reject);
        }, delay - timeSinceLastExecution);
      }
    });
  };

  throttled.flush = (): Promise<TReturn | undefined> => {
    return new Promise((resolve, reject) => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }

      execute()
        .then(resolve)
        .catch(reject);
    });
  };

  return throttled;
}