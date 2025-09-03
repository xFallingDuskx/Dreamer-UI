import { CodeBlockLanguages } from './CodeBlock';

export function getFileExtension(lang: CodeBlockLanguages): string {
  switch (lang) {
    case 'typescript':
    case 'ts':
      return 'ts';
    case 'tsx':
      return 'tsx';
    case 'json':
      return 'json';
    case 'bash':
    case 'sh':
      return 'sh';
    default:
      return 'txt';
  }
}
