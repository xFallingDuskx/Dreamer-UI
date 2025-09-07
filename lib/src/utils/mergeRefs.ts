import { Ref, RefObject } from 'react';

export function mergeRefs<T>(
  ...refs: Array<Ref<T> | undefined>
): (instance: T | null) => void {
  return (instance: T | null) => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(instance); // callback ref
      } else {
        // mutable ref from useRef
        (ref as RefObject<T | null>).current = instance;
      }
    });
  };
}