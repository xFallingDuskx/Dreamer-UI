import { Input, Modal, ScrollArea } from '@moondreamsdev/dreamer-ui/components';
import { X } from '@moondreamsdev/dreamer-ui/symbols';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchContent } from './hooks';
import { Search } from './icons';

export interface SearchBarProps {
	id?: string;
	className?: string;
}

/**
 * Highlight matching text with accent color
 */
function HighlightedText({ text, query }: { text: string; query: string }) {
	if (!query || !text) return <span>{text}</span>;

	const queryLower = query.toLowerCase();
	const textLower = text.toLowerCase();
	const index = textLower.indexOf(queryLower);

	if (index === -1) return <span>{text}</span>;

	const beforeMatch = text.substring(0, index);
	const match = text.substring(index, index + query.length);
	const afterMatch = text.substring(index + query.length);

	return (
		<span>
			{beforeMatch}
			<span className='text-accent font-medium'>{match}</span>
			{afterMatch}
		</span>
	);
}

/**
 * Extract the full prop name from search query for display
 */
function extractPropFromQuery(query: string, result: { content: string; title: string }): string {
	const queryLower = query.toLowerCase();

	// Split content into words to find prop names
	const words = result.content.split(/[\s\-_.]+/);

	// Look for exact matches first
	for (const word of words) {
		if (word.toLowerCase() === queryLower) {
			return word;
		}
	}

	// Look for words that start with the query (for partial matches)
	for (const word of words) {
		if (word.toLowerCase().startsWith(queryLower) && word.length > queryLower.length) {
			// Likely a prop name if it's camelCase or has specific prop patterns
			if (/^[a-z][a-zA-Z]*$/.test(word) || word.includes('Class') || word.includes('Name') || word.endsWith('able')) {
				return word;
			}
		}
	}

	// Look for words that contain the query
	for (const word of words) {
		if (word.toLowerCase().includes(queryLower)) {
			// Return the full word if it looks like a prop name
			if (/^[a-z][a-zA-Z]*$/.test(word) || word.includes('Class') || word.includes('Name')) {
				return word;
			}
		}
	}

	// Fallback to the query itself
	return query;
}

export function SearchBar({ id, className }: SearchBarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState('');
	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement>(null);

	const { results, isLoading } = useSearchContent(query);

	// Handle Command+K shortcut
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === '/') {
				e.preventDefault();
				setIsOpen(true);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	// Focus input when modal opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	const handleResultSelect = (result: { path: string; section?: string; type: string }) => {
		let navigationPath = result.path;

		// Add section anchor for Props and Examples
		if (result.section) {
			const anchor = result.section.toLowerCase().replace(/\s+/g, '-');
			navigationPath = `${result.path}#${anchor}`;
		}

		navigate(navigationPath);
		setIsOpen(false);
		setQuery('');
	};

	const handleClose = () => {
		setIsOpen(false);
		setQuery('');
	};

	return (
		<>
			{/* Search trigger button */}
			<button
				id={id}
				className={join(
					'flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-accent/20 rounded-lg hover:border-accent/50 transition-colors min-w-fit',
					className
				)}
				onClick={() => setIsOpen(true)}
				aria-label='Search documentation'
				data-search-trigger
			>
				<Search className='w-4 h-4 text-gray-300' />
				<span className='text-gray-300 hidden lg:inline-block'>Search documentation...</span>
				<kbd className='px-1.5 py-0.5 text-gray-300 bg-accent/20 border border-accent/50 rounded text-[10px] font-mono'>
					/
				</kbd>
			</button>

			{/* Search modal */}
			<Modal
				isOpen={isOpen}
				onClose={handleClose}
				hideCloseButton={true}
				className='max-w-2xl !bg-gray-900 !p-9'
				overlayClassName='backdrop-blur-xs'
				containerClassName='items-start pt-12 sm:pt-20 md:pt-28'
			>
				<div className='flex items-center mb-2'>
					<Search className='w-5 h-5 text-muted-foreground' />
					<Input
						ref={inputRef}
						value={query}
						variant='base'
						onChange={(e) => setQuery(e.target.value)}
						placeholder='Search components, examples, and documentation...'
						className='text-lg'
						autoComplete='off'
						width={'100%'}
					/>
					<button
						onClick={handleClose}
						className='p-1 hover:bg-muted/50 rounded transition-colors focus:outline-none focus:ring focus:ring-accent'
					>
						<X className='w-4 h-4' />
					</button>
				</div>

				{query && (
					<div className='border-t border-border pt-4'>
						{isLoading ? (
							<div className='text-center opacity-50 py-8'>Searching...</div>
						) : results.length > 0 ? (
							<ScrollArea viewportClassName='space-y-2 max-h-96 p-0.5' thumbClassName='bg-accent-dark!'>
								{results.slice(0, 12).map((result, index) => (
									<button
										key={`${result.path}-${index}`}
										onClick={() => handleResultSelect(result)}
										className='w-full text-left p-3 hover:bg-accent/10 rounded transition-colors group focus:outline-none focus:ring focus:ring-accent'
									>
										<div className='flex items-start justify-between'>
											<div className='flex-1'>
												{result.type === 'Props' ? (
													// Special formatting for Props results
													<>
														<div className='font-medium group-hover:text-accent transition-colors'>
															{result.title.replace(' Props', '')} →{' '}
															<HighlightedText
																text={extractPropFromQuery(query, { content: result.content, title: result.title })}
																query={query}
															/>
														</div>
														<div className='text-sm opacity-70 mt-1'>{result.description}</div>
													</>
												) : (
													// Regular formatting for other results
													<>
														<div className='font-medium group-hover:text-accent transition-colors'>
															<HighlightedText text={result.title} query={query} />
														</div>
														{result.matchedText && result.matchedField !== 'title' && (
															<div className='text-sm opacity-70 mt-1'>
																<HighlightedText text={result.matchedText} query={query} />
															</div>
														)}
														{result.description && result.matchedField !== 'description' && (
															<div className='text-sm opacity-70 mt-1'>{result.description}</div>
														)}
													</>
												)}
												{result.section && result.type !== 'Props' && (
													<div className='text-xs opacity-50 mt-1'>in {result.section}</div>
												)}
											</div>
											<div className='text-xs opacity-50'>{result.type}</div>
										</div>
									</button>
								))}
							</ScrollArea>
						) : (
							<div className='text-center text-muted-foreground py-8'>No results found for "{query}"</div>
						)}
					</div>
				)}

				{!query && (
					<div className='border-t border-border pt-4'>
						<div className='text-sm text-muted-foreground mb-3'>Quick navigation</div>
						<div className='space-y-2'>
							{[
								{ title: 'Getting Started', path: '/getting-started', type: 'Guide' },
								{ title: 'All Components', path: '/components', type: 'Overview' },
								{ title: 'Button', path: '/components/button', type: 'Component' },
								{ title: 'Input', path: '/components/input', type: 'Component' },
							].map((item) => (
								<button
									key={item.path}
									onClick={() => handleResultSelect(item)}
									className='w-full text-left p-2 hover:bg-accent/10 rounded transition-colors group focus:outline-none focus:ring focus:ring-accent'
								>
									<div className='flex items-center justify-between'>
										<span className='group-hover:text-accent group-focus:text-accent transition-colors'>
											{item.title}
										</span>
										<span className='text-xs opacity-50'>{item.type}</span>
									</div>
								</button>
							))}
						</div>
					</div>
				)}
			</Modal>
		</>
	);
}
