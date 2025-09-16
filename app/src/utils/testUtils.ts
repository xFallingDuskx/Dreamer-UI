// Temporary local copy of debounce utility for testing
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

// Temporary local copy of throttle utility for testing  
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