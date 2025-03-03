import { Ref, useId } from 'react';
import { StatusHelpMessage } from '../../shared/forms';
import { join } from '../../util/join';
import { useAutoExpand } from './hooks';
import './styles.css';
import { roundedVariants, textareaDefaults, textareaVariants, TextareaVariants } from './variants';

interface TextareaProps extends Partial<TextareaVariants>, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
  displayOnlyMode?: boolean;
  errorMessage?: string;
  successMessage?: string;
  hideResizeHandle?: boolean; // only works for Webkit browsers
  autoExpand?: boolean;
}

export default function Textarea({
  variant = textareaDefaults.variant,
  rounded,
  displayOnlyMode = false,
  errorMessage,
  successMessage,
  hideResizeHandle = false,
  autoExpand = false,
  className,
  ...rest
}: TextareaProps) {
  const id = useId();
  useAutoExpand(id, autoExpand);

  // Default `round` of `md` for `outline` variant
  let adjustedRound = rounded;
  if (variant === 'outline' && !rounded) {
    adjustedRound = 'md';
  }
  adjustedRound = adjustedRound || textareaDefaults.rounded;

  let adjustedHideResizeHandle = hideResizeHandle;
  if (variant === 'left-line' && !hideResizeHandle) {
    adjustedHideResizeHandle = true;
  }

  const baseClasses =
    'appearance-none w-full focus:outline-none disabled:opacity-50 placeholder:text-muted/70 hide-number-input-arrows transition-all';

  const inputClasses = join(
    baseClasses,
    !displayOnlyMode && textareaVariants[variant],
    !displayOnlyMode && roundedVariants[adjustedRound],
    !displayOnlyMode && 'px-2 py-1',
    displayOnlyMode && 'pointer-events-none',
    adjustedHideResizeHandle && 'no-resize-handle',

    className
  );

  return (
    <div className='text-left -space-y-1.5'>
      <textarea
        {...rest}
        id={id}
        aria-disabled={rest.disabled}
        readOnly={displayOnlyMode}
        aria-readonly={displayOnlyMode || rest['aria-readonly']}
        aria-invalid={errorMessage ? true : successMessage ? false : undefined}
        data-error={errorMessage ? true : undefined}
        data-success={successMessage ? true : undefined}
        style={{
          resize: autoExpand ? 'none' : undefined,
        }}
        className={inputClasses}
      />
      {!displayOnlyMode && <StatusHelpMessage elementId={id} type='error' message={errorMessage} />}
      {!displayOnlyMode && <StatusHelpMessage elementId={id} type='success' message={successMessage} />}
    </div>
  );
}
