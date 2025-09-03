import { CodeBlockLanguages } from './CodeBlock';

export function getFileExtension(lang: CodeBlockLanguages): string {
  switch (lang) {
    case 'typescript':
      return 'ts';
    case 'ts':
      return 'ts';
    case 'tsx':
      return 'tsx';
    case 'json':
      return 'json';
    default:
      return 'txt';
  }
}
