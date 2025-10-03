import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  /** Current theme setting (can be 'light', 'dark', or 'system') */
  theme: Theme;
  /** Function to change the current theme */
  setTheme: (theme: Theme) => void;
  /** Resolved theme after system preference detection (always 'light' or 'dark') */
  resolvedTheme: 'light' | 'dark';
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}