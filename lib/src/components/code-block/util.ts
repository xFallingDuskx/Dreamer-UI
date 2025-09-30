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
    case 'css':
      return 'css';
    case 'markdown':
    case 'md':
      return 'md';
    default:
      return 'txt';
  }
}
