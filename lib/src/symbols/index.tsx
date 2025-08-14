export { default as Check } from './Check';
export { default as CheckCircled } from './CheckCircled';
export { default as ChevronDoubleLeft } from './ChevronDoubleLeft';
export { default as ChevronDoubleRight } from './ChevronDoubleRight';
export { default as ChevronDown } from './ChevronDown';
export { default as ChevronLeft } from './ChevronLeft';
export { default as ChevronRight } from './ChevronRight';
export { default as CrossCircled } from './CrossCircled';
export { default as ExclamationTriangle } from './ExclamationTriangle';
export { default as EyeClosed } from './EyeClosed';
export { default as EyeOpened } from './EyeOpened';
export { default as InfoCircled } from './InfoCircled';
export { default as QuestionMarkCircled } from './QuestionMarkCircled';
export { default as X } from './X';

export interface SymbolProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: string;
}
