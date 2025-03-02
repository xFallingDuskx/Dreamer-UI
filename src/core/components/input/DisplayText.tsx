import { join } from '../../util/join';
import { useDisplay } from './hooks';

interface DisplayTextProps extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  inputId: string;
  displayOnlyMode: boolean;
  displayPlaceholder?: string;
}

export default function DisplayText({ inputId, displayOnlyMode, ...rest }: DisplayTextProps) {
  const { inputtedText, font, color } = useDisplay(inputId);

  if (!displayOnlyMode) {
    return null;
  }
  return (
    <p className={join(!inputtedText && !rest['value'] && 'opacity-50')} style={{ font, color }}>
      {rest['value'] || inputtedText || rest['placeholder']}
    </p>
  );
}
