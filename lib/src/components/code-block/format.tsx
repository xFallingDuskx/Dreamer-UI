import {
	defaultBashTokenClasses,
	defaultCSSTokenClasses,
	defaultJsonTokenClasses,
	defaultMarkdownTokenClasses,
	defaultTSTokenClasses,
} from './classes';
import { tokenizeBash, tokenizeCSS, tokenizeJSON, tokenizeMarkdown, tokenizeTypeScript } from './tokenize';
import {
	BashTokenClasses,
	CSSTokenClasses,
	JsonTokenClasses,
	MarkdownTokenClasses,
	TSTokenClasses,
	TSTokenType,
} from './types';

export function formatBash(codeLines: string[], customTokenClasses?: BashTokenClasses) {
	const mergedTokenClasses = {
		...defaultBashTokenClasses,
		...customTokenClasses,
	};

	return codeLines.map((line, lineIndex) => {
		const tokens = tokenizeBash(line);
		return (
			<div key={lineIndex} className='leading-6'>
				{tokens.map((token, tokenIndex) => (
					<span key={tokenIndex} className={mergedTokenClasses[token.type] || 'text-gray-100'}>
						{token.text}
					</span>
				))}
			</div>
		);
	});
}

export function formatCSS(codeLines: string[], customTokenClasses?: CSSTokenClasses) {
	const mergedTokenClasses = { ...defaultCSSTokenClasses, ...customTokenClasses };

	let inMultilineComment = false;

	return codeLines.map((line, lineIndex) => {
		const { tokens, inComment } = tokenizeCSS(line, inMultilineComment);
		inMultilineComment = inComment;
		return (
			<div key={lineIndex} className='leading-6'>
				{tokens.map((token, tokenIndex) => (
					<span key={tokenIndex} className={mergedTokenClasses[token.type] || 'text-gray-100'}>
						{token.text}
					</span>
				))}
			</div>
		);
	});
}

export function formatJson(codeLines: string[], customTokenClasses?: JsonTokenClasses) {
	const mergedTokenClasses = { ...defaultJsonTokenClasses, ...customTokenClasses };

	return codeLines.map((line, lineIndex) => (
		<div key={lineIndex} className='leading-6'>
			{tokenizeJSON(line).map((token, tokenIndex) => (
				<span key={tokenIndex} className={mergedTokenClasses[token.type] || 'text-gray-100'}>
					{token.text}
				</span>
			))}
		</div>
	));
}

export function formatTypescript(codeLines: string[], customTokenClasses?: TSTokenClasses) {
	const mergedTokenClasses = { ...defaultTSTokenClasses, ...customTokenClasses };

	let globalJSXContext = false; // Track JSX context across lines
	let globalBraceDepth = 0; // Track JSX expression depth across lines
	let inTemplateLiteral = false; // Track template literal context across lines

	return codeLines.map((line, lineIndex) => {
		// Handle empty lines by adding a non-breaking space
		if (line.trim() === '') {
			return (
				<div key={lineIndex} className='leading-6'>
					&nbsp;
				</div>
			);
		}

		const tokens = tokenizeTypeScript(line, globalJSXContext, globalBraceDepth, inTemplateLiteral);

		// Update template literal context
		const backtickCount = (line.match(/`/g) || []).length;
		if (backtickCount % 2 === 1) {
			inTemplateLiteral = !inTemplateLiteral;
		}

		// Update global JSX context based on this line's content
		if (line.includes('<') && line.match(/<[a-zA-Z]/)) {
			globalJSXContext = true;
		}
		if (line.includes('>') && !line.includes('<')) {
			globalJSXContext = false;
			globalBraceDepth = 0; // Reset brace depth when exiting JSX
		}

		// Update global brace depth
		const openBraces = (line.match(/\{/g) || []).length;
		const closeBraces = (line.match(/\}/g) || []).length;
		globalBraceDepth += openBraces - closeBraces;
		if (globalBraceDepth < 0) globalBraceDepth = 0;

		return (
			<div key={lineIndex} className='leading-6'>
				{tokens.map((token: { text: string; type: TSTokenType }, tokenIndex: number) => {
					return (
						<span
							key={tokenIndex}
							className={mergedTokenClasses[token.type as keyof TSTokenClasses] || 'text-gray-100'}
						>
							{token.text}
						</span>
					);
				})}
			</div>
		);
	});
}

export function formatMarkdown(codeLines: string[], customTokenClasses?: MarkdownTokenClasses) {
	const mergedTokenClasses = { ...defaultMarkdownTokenClasses, ...customTokenClasses };

	return codeLines.map((line, lineIndex) => (
		<div key={lineIndex} className='leading-6'>
			{tokenizeMarkdown(line).map((token, tokenIndex) => (
				<span key={tokenIndex} className={mergedTokenClasses[token.type] || 'text-gray-100'}>
					{token.text}
				</span>
			))}
		</div>
	));
}
