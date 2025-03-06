import { Ref, useId } from 'react';
import { StatusHelpMessage } from '../../shared/forms';
import { join } from '../../util/join';
import { useAutoExpand } from './hooks';
import './styles.css';
import { roundedVariants, textareaDefaults, textareaVariants, TextareaVariants } from './variants';
import CharacterCount from './CharacterCount';

interface TextareaProps extends Partial<TextareaVariants>, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
  displayOnlyMode?: boolean;
  errorMessage?: string;
  successMessage?: string;
  hideResizeHandle?: boolean; // only works for Webkit browsers
  autoExpand?: boolean;
  characterLimit?: number;
}

export default function Textarea({
  variant = textareaDefaults.variant,
  rounded,
  displayOnlyMode = false,
  errorMessage,
  successMessage,
  hideResizeHandle = false,
  autoExpand = false,
  characterLimit = 0,
  className,
  ...rest
}: TextareaProps) {
  const id = useId();
  useAutoExpand(id, autoExpand || displayOnlyMode);

  // Default `round` of `md` for `outline` variant
  let adjustedRound = rounded;
  if (variant === 'outline' && !rounded) {
    adjustedRound = 'md';
  }
  adjustedRound = adjustedRound || textareaDefaults.rounded;

  let adjustedHideResizeHandle = hideResizeHandle;
  if (displayOnlyMode || (variant === 'left-line' && !hideResizeHandle)) {
    adjustedHideResizeHandle = true;
  }

  const baseClasses =
    'appearance-none w-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-muted/70 hide-number-input-arrows transition-all';

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
    <div className={join('-space-y-1.5', displayOnlyMode && 'cursor-text')}>
      <textarea
        {...rest}
        id={id}
        aria-disabled={rest.disabled}
        readOnly={displayOnlyMode}
        aria-readonly={displayOnlyMode || rest['aria-readonly']}
        style={{
          resize: autoExpand ? 'none' : undefined,
        }}
        className={inputClasses}
      />
      {characterLimit > 0 && <CharacterCount elementId={id} maxLength={characterLimit} />}
      {!displayOnlyMode && <StatusHelpMessage elementId={id} type='error' message={errorMessage} />}
      {!displayOnlyMode && <StatusHelpMessage elementId={id} type='success' message={successMessage} />}
    </div>
  );
}
