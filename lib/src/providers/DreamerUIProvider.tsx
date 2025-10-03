import { ReactNode } from 'react';
import { ActionModalProvider } from './ActionModalProvider';
import { ThemeProvider, ThemeProviderProps } from './ThemeProvider';
import { ToastProvider, ToastProviderProps } from './ToastProvider';

export interface DreamerUIProviderProps {
	children: ReactNode;
	theme?: Omit<ThemeProviderProps, 'children'>;
	toast?: Omit<ToastProviderProps, 'children'>;
}

export function DreamerUIProvider({ children, theme = {}, toast = {} }: DreamerUIProviderProps) {
	return (
		<ThemeProvider {...theme}>
			<ToastProvider {...toast}>
				<ActionModalProvider>{children}</ActionModalProvider>
			</ToastProvider>
		</ThemeProvider>
	);
}
