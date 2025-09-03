import { JsonTokenClasses, TSTokenType } from './types';

export function tokenizeJSON(line: string) {
  // Updated regex: match key and colon separately
  const regex = /("[^"]*")\s*(:)|("[^"]*")|(\d+)|(true|false|null)|(\{|\}|\[|\]|,)/g;
  const tokens: { text: string; type: keyof JsonTokenClasses }[] = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), type: 'plain' });
    }
    if (match[1] && match[2]) {
      tokens.push({ text: match[1], type: 'key' });
      tokens.push({ text: match[2], type: 'punctuation' });
    } else if (match[3]) {
      tokens.push({ text: match[3], type: 'string' });
    } else if (match[4]) {
      tokens.push({ text: match[4], type: 'number' });
    } else if (match[5]) {
      tokens.push({ text: match[5], type: 'boolean' });
    } else if (match[6]) {
      tokens.push({ text: match[6], type: 'punctuation' });
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), type: 'plain' });
  }
  return tokens;
}

export function tokenizeTypeScript(
  code: string,
  inheritedJSXContext: boolean = false,
  inheritedBraceDepth: number = 0
) {
  const tokens: Array<{ text: string; type: TSTokenType }> = [];
  let remaining = code;
  let isInJSX = inheritedJSXContext;
  let jsxBraceDepth = inheritedBraceDepth; // Track JSX expression depth

  while (remaining.length > 0) {
    // Multi-line comments
    const multiComment = remaining.match(/^\/\*[\s\S]*?\*\//);
    if (multiComment) {
      tokens.push({ text: multiComment[0], type: 'comment' });
      remaining = remaining.slice(multiComment[0].length);
      continue;
    }

    // Single line comments
    const singleComment = remaining.match(/^\/\/.*$/m);
    if (singleComment) {
      tokens.push({ text: singleComment[0], type: 'comment' });
      remaining = remaining.slice(singleComment[0].length);
      continue;
    }

    // Strings
    const stringMatch = remaining.match(/^(`[^`]*`|"[^"]*"|'[^']*')/);
    if (stringMatch) {
      tokens.push({ text: stringMatch[0], type: 'string' });
      remaining = remaining.slice(stringMatch[0].length);
      continue;
    }

    // JSX opening tag start
    const jsxOpenStart = remaining.match(/^<([a-zA-Z][a-zA-Z0-9]*)/);
    if (jsxOpenStart) {
      tokens.push({ text: '<', type: 'jsx-bracket' });
      tokens.push({ text: jsxOpenStart[1], type: 'jsx-tag' });
      remaining = remaining.slice(jsxOpenStart[0].length);
      isInJSX = true;
      continue;
    }

    // JSX closing tag
    const jsxClose = remaining.match(/^<\/([a-zA-Z][a-zA-Z0-9]*)>/);
    if (jsxClose) {
      tokens.push({ text: '</', type: 'jsx-bracket' });
      tokens.push({ text: jsxClose[1], type: 'jsx-tag' });
      tokens.push({ text: '>', type: 'jsx-bracket' });
      remaining = remaining.slice(jsxClose[0].length);
      isInJSX = false;
      continue;
    }

    // JSX self-closing or tag end
    if (remaining.match(/^\/?>/)) {
      const tagEnd = remaining.match(/^(\/?>\s*)/);
      if (tagEnd) {
        tokens.push({ text: tagEnd[1].trim(), type: 'jsx-bracket' });
        remaining = remaining.slice(tagEnd[1].length);
        if (tagEnd[1].includes('>')) {
          isInJSX = false;
        }
        continue;
      }
    }

    // JSX attribute (only when explicitly in JSX context, followed by =, and not inside braces)
    const jsxAttr = remaining.match(/^([a-zA-Z][a-zA-Z0-9]*)(\s*)(=)/);
    if (jsxAttr && isInJSX && jsxBraceDepth === 0) {
      tokens.push({ text: jsxAttr[1], type: 'jsx-attribute' });
      if (jsxAttr[2]) {
        // Whitespace before =
        tokens.push({ text: jsxAttr[2], type: 'plain' });
      }
      tokens.push({ text: '=', type: 'plain' });
      remaining = remaining.slice(jsxAttr[0].length);
      continue;
    }

    // JSX expression braces
    const jsxBrace = remaining.match(/^[{}]/);
    if (jsxBrace) {
      tokens.push({ text: jsxBrace[0], type: 'jsx-brace' });
      if (jsxBrace[0] === '{') {
        jsxBraceDepth++;
      } else if (jsxBrace[0] === '}') {
        jsxBraceDepth--;
      }
      remaining = remaining.slice(1);
      continue;
    }

    // Whitespace (preserve spaces)
    const whitespace = remaining.match(/^\s+/);
    if (whitespace) {
      tokens.push({ text: whitespace[0], type: 'plain' });
      remaining = remaining.slice(whitespace[0].length);
      continue;
    }

    // Operators (including arrow functions)
    const operator = remaining.match(/^(=>|===|!==|==|!=|<=|>=|&&|\|\||[+\-*/%=<>!&|^~?:;,()[\]{}.])/);
    if (operator) {
      tokens.push({ text: operator[0], type: 'operator' });
      remaining = remaining.slice(operator[0].length);
      continue;
    }

    // Keywords
    const keyword = remaining.match(
      /^(const|let|var|function|if|else|for|while|return|import|export|class|extends|interface|type|enum|async|await|public|private|protected|static|from|as|default|new|this|super|try|catch|finally|throw|break|continue|switch|case|typeof|instanceof)\b/
    );
    if (keyword) {
      tokens.push({ text: keyword[0], type: 'keyword' });
      remaining = remaining.slice(keyword[0].length);
      continue;
    }

    // React hooks (before function calls to avoid conflicts)
    const hook = remaining.match(/^(use[A-Z][a-zA-Z]*)\b/);
    if (hook) {
      tokens.push({ text: hook[0], type: 'hook' });
      remaining = remaining.slice(hook[0].length);
      continue;
    }

    // Function calls (word followed by opening parenthesis or optional chaining)
    const func = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=(\?\.)?\()/);
    if (func) {
      tokens.push({ text: func[1], type: 'function' });
      remaining = remaining.slice(func[1].length);
      continue;
    }

    // Types
    const type = remaining.match(
      /^(string|number|boolean|object|any|void|never|unknown|null|undefined|Promise|Array|React\.FC|FC|JSX\.Element|HTMLElement|Event|MouseEvent|KeyboardEvent|ChangeEvent)\b/
    );
    if (type) {
      tokens.push({ text: type[0], type: 'type' });
      remaining = remaining.slice(type[0].length);
      continue;
    }

    // Numbers
    const number = remaining.match(/^(\d+\.?\d*)/);
    if (number) {
      tokens.push({ text: number[0], type: 'number' });
      remaining = remaining.slice(number[0].length);
      continue;
    }

    // Object properties (word followed by colon, not in JSX)
    const property = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=:)/);
    if (property && !isInJSX) {
      tokens.push({ text: property[1], type: 'property' });
      remaining = remaining.slice(property[1].length);
      continue;
    }

    // If nothing matched, take one character as plain text
    tokens.push({ text: remaining[0], type: 'plain' });
    remaining = remaining.slice(1);
  }

  return tokens;
}
