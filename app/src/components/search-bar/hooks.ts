import { useMemo, useState } from 'react';
import { searchContent } from './searchContent';

export function useSearchContent(query: string) {
	const [isLoading, setIsLoading] = useState(false);

	const results = useMemo(() => {
		if (!query || query.trim().length < 2) {
			return [];
		}

		setIsLoading(true);

		try {
			const searchResults = searchContent(query.trim());
			setIsLoading(false);
			return searchResults;
		} catch (error) {
			setIsLoading(false);
			console.error('Search error:', error);
			return [];
		}
	}, [query]);

	return { results, isLoading };
}

export function useKeyboardNavigation() {
	// Additional keyboard navigation hook for future enhancements
	return {};
}
