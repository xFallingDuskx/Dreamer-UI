import { BASH_KEYWORDS, BASH_RUNNERS } from './constants';
import { BashTokenType, CSSTokenClasses, JsonTokenClasses, TSTokenType } from './types';

export function tokenizeBash(codeLine: string): { text: string; type: BashTokenType }[] {
  const tokens: { text: string; type: BashTokenType }[] = [];

  if (codeLine.trim() === '') {
    tokens.push({ text: '\u00A0', type: 'plain' });
    return tokens;
  }

  if (codeLine.trim().startsWith('#')) {
    tokens.push({ text: codeLine, type: 'comment' });
    return tokens;
  }

  const regex =
    /(\$\([^)]*\)|"[^"]*"|'[^']*'|\$[\w_]+|[a-zA-Z_]\w*=|--?[a-zA-Z0-9][\w-]*(?:=.*)?|>>|>|#.*|\s+|[^\s]+)/g;

  const processToken = (token: string): { text: string; type: BashTokenType }[] => {
    // Handle command substitution recursively
    if (/^\$\([^)]*\)$/.test(token)) {
      const inner = token.slice(2, -1);
      return [{ text: '$(', type: 'operator' }, ...tokenizeBash(inner), { text: ')', type: 'operator' }];
    }

    // Handle double-quoted strings with variables inside
    if (/^".*"$/.test(token)) {
      const inner = token.slice(1, -1);
      const innerTokens: { text: string; type: BashTokenType }[] = [];
      let lastIndex = 0;
      const varRegex = /\$[\w_]+/g;
      let match;
      while ((match = varRegex.exec(inner)) !== null) {
        if (match.index > lastIndex) {
          innerTokens.push({
            text: inner.slice(lastIndex, match.index),
            type: 'string',
          });
        }
        innerTokens.push({ text: match[0], type: 'variable' });
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < inner.length) {
        innerTokens.push({ text: inner.slice(lastIndex), type: 'string' });
      }
      return [{ text: '"', type: 'string' }, ...innerTokens, { text: '"', type: 'string' }];
    }

    // Single-quoted strings are literal
    if (/^'.*'$/.test(token)) {
      return [{ text: token, type: 'string' }];
    }

    if (/^\$[\w_]+$/.test(token)) return [{ text: token, type: 'variable' }];
    if (/^[a-zA-Z_]\w*=$/.test(token)) return [{ text: token, type: 'variable' }];
    if (/^--?[a-zA-Z0-9][\w-]*(=.*)?$/.test(token)) return [{ text: token, type: 'option' }];
    if (/^>>|>$/.test(token)) return [{ text: token, type: 'operator' }];
    if (/^#.*$/.test(token)) return [{ text: token, type: 'comment' }];
    if (/^\s+$/.test(token)) return [{ text: token, type: 'plain' }];
    if (BASH_KEYWORDS.has(token)) return [{ text: token, type: 'keyword' }];
    if (BASH_RUNNERS.has(token)) return [{ text: token, type: 'runner' }];
    return [{ text: token, type: 'command' }];
  };

  let match;
  while ((match = regex.exec(codeLine)) !== null) {
    tokens.push(...processToken(match[0]));
  }

  return tokens;
}

export function tokenizeCSS(codeLine: string, isInComment: boolean = false) {
  const tokens: Array<{ text: string; type: keyof CSSTokenClasses }> = [];
  let inMultilineComment = isInComment;

  // Preserve empty lines as a non-breaking space
  if (codeLine.trim() === '') {
    tokens.push({ text: '\u00A0', type: 'plain' });
    return { tokens, inComment: inMultilineComment };
  }

  // Context tracking - initialize based on line content
  let context: 'selector' | 'property' | 'value' = 'selector';
  let braceDepth = 0;
  
  // If line starts with whitespace and has a colon, likely a property declaration
  if (codeLine.match(/^\s+/) && codeLine.includes(':') && !codeLine.includes('{')) {
    context = 'property';
    braceDepth = 1; // Assume we're inside a rule block
  }

  const regex = /(\/\*[\s\S]*?\*\/|\/\*[\s\S]*$|\*\/)|(@[a-zA-Z-]+)|(\{|\}|:|;|,|\(|\))|("(?:[^"]*)"|'(?:[^']*)')|([a-zA-Z-]+)(?=\()|([0-9.]+(?:px|rem|em|%|vh|vw|deg|s|ms|fr)?)|(#[a-fA-F0-9]{3,8})|([a-zA-Z0-9_-]+|[.#][a-zA-Z0-9_-]+)|(\s+)|(\S+)/g;

  let match;
  while ((match = regex.exec(codeLine))) {
    const [, comment, atRule, punctuation, str, func, number, hexColor, identifier, whitespace, plain] = match;

    if (comment) {
      // Handle multiline comments
      if (comment.includes('/*') && !comment.includes('*/')) {
        inMultilineComment = true;
      } else if (comment.includes('*/')) {
        inMultilineComment = false;
      }
      tokens.push({ text: comment, type: 'comment' });
    } else if (inMultilineComment) {
      // Everything is a comment until we see */
      if (match[0].includes('*/')) {
        inMultilineComment = false;
      }
      tokens.push({ text: match[0], type: 'comment' });
    } else if (atRule) {
      tokens.push({ text: atRule, type: 'atRule' });
    } else if (func) {
      tokens.push({ text: func, type: 'function' });
    } else if (punctuation) {
      if (punctuation === '{') {
        braceDepth++;
        context = 'property';
      } else if (punctuation === '}') {
        braceDepth--;
        context = braceDepth > 0 ? 'property' : 'selector';
      } else if (punctuation === ':') {
        // Only switch to value context if we're currently in property context
        if (context === 'property') {
          context = 'value';
        }
      } else if (punctuation === ';') {
        if (braceDepth > 0) {
          context = 'property';
        }
      } else if (punctuation === ',') {
        // Comma in selector context or value context - maintain current context
        if (braceDepth === 0) {
          context = 'selector';
        }
      }
      tokens.push({ text: punctuation, type: 'punctuation' });
    } else if (str) {
      tokens.push({ text: str, type: 'string' });
    } else if (number) {
      tokens.push({ text: number, type: 'number' });
    } else if (hexColor) {
      tokens.push({ text: hexColor, type: 'value' });
    } else if (identifier) {
      let tokenType: keyof CSSTokenClasses;
      
      // Special handling for selectors (class/id prefixes)
      if (identifier.startsWith('.') || identifier.startsWith('#')) {
        tokenType = 'selector';
      } else if (context === 'selector') {
        tokenType = 'selector';
      } else if (context === 'property') {
        tokenType = 'property';
      } else {
        // context === 'value'
        tokenType = 'value';
      }
      
      tokens.push({ text: identifier, type: tokenType });
    } else if (whitespace) {
      tokens.push({ text: whitespace.replace(/ /g, '\u00A0'), type: 'plain' });
    } else if (plain) {
      // Default unknown tokens to value if we're in value context, otherwise plain
      const type = context === 'value' ? 'value' : 'plain';
      tokens.push({ text: plain, type });
    }
  }

  return { tokens, inComment: inMultilineComment };
}

export function tokenizeJSON(codeLine: string) {
  const regex = /("[^"]*")\s*(:)|("[^"]*")|(\d+)|(true|false|null)|(\{|\}|\[|\]|,)/g;
  const tokens: { text: string; type: keyof JsonTokenClasses }[] = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(codeLine)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: codeLine.slice(lastIndex, match.index), type: 'plain' });
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
  if (lastIndex < codeLine.length) {
    tokens.push({ text: codeLine.slice(lastIndex), type: 'plain' });
  }
  return tokens;
}

export function tokenizeTypeScript(
  codeLine: string,
  inheritedJSXContext: boolean = false,
  inheritedBraceDepth: number = 0
) {
  const tokens: Array<{ text: string; type: TSTokenType }> = [];
  let remaining = codeLine;
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
