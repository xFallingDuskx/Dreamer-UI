import { ReactNode } from 'react';
import { ActionModalProvider } from './ActionModalProvider';
import { ThemeProvider, ThemeProviderProps } from './ThemeProvider';
import { ToastProvider, ToastProviderProps } from './ToastProvider';

export interface DreamerUIProviderProps {
	/** React children to be wrapped by all DreamerUI providers */
	children: ReactNode;
	/** Configuration options for the ThemeProvider */
	theme?: Omit<ThemeProviderProps, 'children'>;
	/** Configuration options for the ToastProvider */
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
