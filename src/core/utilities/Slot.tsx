import React, {
  cloneElement,
  createElement,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';

interface SlotProps<T> extends HTMLAttributes<T> {
  children?: ReactNode;
  ref?: Ref<T>;
}

export function Slot<T = HTMLElement>({ children, ref, ...props }: SlotProps<T>) {

  if (isValidElement(children)) {
    let allProps = { ...props };
    if (children.props) {
      allProps = { ...allProps, ...children.props };
    }
    return cloneElement(children, {
      ...allProps,
      ref: (node: T) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.RefObject<T>).current = node;
        }
      },
    } as unknown as ReactElement);
  }

  // If not asChild or no valid child, render as div
  return createElement('div', { ...props, ref }, children);
}
