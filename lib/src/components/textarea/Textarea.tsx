import { Ref, useId } from 'react';
import { StatusHelpMessage } from '../../shared/forms';
import { join } from '../../utils';
import CharacterCount from './CharacterCount';
import { useAutoExpand } from './hooks';
import './styles.css';
import { roundedVariants, textareaDefaults, textareaVariants, TextareaVariants } from './variants';

export interface TextareaProps extends Partial<TextareaVariants>, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Reference to the textarea element. */
  ref?: Ref<HTMLTextAreaElement>;
  /** Read-only mode for displaying text content without interaction styling. */
  displayOnlyMode?: boolean;
  /** Error message to display below the textarea. */
  errorMessage?: string;
  /** Success message to display below the textarea. */
  successMessage?: string;
  /** Whether to show the resize handle (Webkit browsers only). Defaults to false. */
  showResizeHandle?: boolean; // only works for Webkit browsers
  /** Whether the textarea should automatically expand based on content. */
  autoExpand?: boolean;
  /** Maximum number of characters allowed. Shows character count when > 0. */
  characterLimit?: number;
}

/**
 * A versatile textarea component with auto-expand, character counting, and validation states.
 * Supports both interactive and display-only modes with various styling options.
 * 
 * The textarea always uses full available width. For width constraints or layout changes,
 * wrap the component in a container element.
 * 
 * @example
 * ```tsx
 * // Basic textarea (full width)
 * <Textarea 
 *   placeholder="Enter your message..."
 *   rows={4}
 *   value={message}
 *   onChange={(e) => setMessage(e.target.value)}
 * />
 * 
 * // Auto-expanding with character limit
 * <Textarea
 *   autoExpand
 *   characterLimit={500}
 *   placeholder="Write your bio..."
 *   errorMessage={bioError}
 *   variant="outline"
 * />
 * 
 * // Width constrained with container
 * <div className="max-w-md">
 *   <Textarea 
 *     placeholder="Constrained width textarea"
 *     rows={4}
 *   />
 * </div>
 * 
 * // In flex layout
 * <div className="flex gap-4">
 *   <div className="flex-1">
 *     <Textarea placeholder="Flexible width" rows={3} />
 *   </div>
 *   <div className="w-64">
 *     <Textarea placeholder="Fixed width" rows={3} />
 *   </div>
 * </div>
 * 
 * // Display-only mode
 * <Textarea 
 *   displayOnlyMode 
 *   value="Read-only content display"
 * />
 * ```
 */
export function Textarea({
  variant = textareaDefaults.variant,
  rounded,
  displayOnlyMode = false,
  errorMessage,
  successMessage,
  showResizeHandle = false,
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

  const baseClasses =
    'appearance-none w-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-muted-foreground/70 hide-number-input-arrows transition-all';

  const inputClasses = join(
    baseClasses,
    !displayOnlyMode && textareaVariants[variant],
    !displayOnlyMode && roundedVariants[adjustedRound],
    !displayOnlyMode && 'px-2 py-1',
    displayOnlyMode && 'pointer-events-none cursor-text',
    !showResizeHandle && 'no-resize-handle',

    className
  );

  // Check if we need wrapper div
  const hasCharacterCount = characterLimit > 0;
  const hasStatusMessages = !displayOnlyMode && (errorMessage || successMessage);
  const needsWrapper = hasCharacterCount || hasStatusMessages;

  // If no wrapper needed, return just the textarea
  if (!needsWrapper) {
    return (
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
    );
  }

  // Full wrapper structure needed
  return (
    <div className="w-full -space-y-1.5">
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
      <StatusHelpMessage elementId={id} type='error' message={errorMessage} />
      <StatusHelpMessage elementId={id} type='success' message={successMessage} />
    </div>
  );
}
