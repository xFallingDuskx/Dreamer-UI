import { ReactNode, useCallback, useLayoutEffect, useState } from 'react';
import { Theme, ThemeContext, ThemeContextValue } from '../hooks/useTheme';

export interface ThemeProviderProps {
  /** React children to be wrapped by the theme provider */
  children: ReactNode;
  /** The default theme to use on first load. Defaults to 'system' */
  defaultTheme?: Theme;
  /** Local storage key used to persist the theme selection. Defaults to 'dreamer-ui-theme' */
  storageKey?: string;
  /** HTML attribute name to set on document root. Defaults to 'data-theme' */
  attribute?: string;
  /** Whether to respect system theme when theme is set to 'system'. Defaults to true */
  respectSystem?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'dreamer-ui-theme',
  attribute = 'data-theme',
  respectSystem = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    const stored = localStorage.getItem(storageKey);
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored as Theme;
    }

    return defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    if (theme === 'system' && respectSystem) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return theme === 'dark' ? 'dark' : 'light';
  });

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, newTheme);
      }
    },
    [storageKey]
  );

  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const updateResolvedTheme = () => {
      if (theme === 'system' && respectSystem) {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setResolvedTheme(systemTheme);
      } else {
        setResolvedTheme(theme === 'dark' ? 'dark' : 'light');
      }
    };

    updateResolvedTheme();

    if (theme === 'system' && respectSystem) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateResolvedTheme);
      return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
    }
  }, [theme, respectSystem]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    root.setAttribute(attribute, resolvedTheme);
    
    // Also set class for Tailwind dark mode
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme, attribute]);

  const contextValue: ThemeContextValue = {
    theme,
    setTheme,
    resolvedTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}