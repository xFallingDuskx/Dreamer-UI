import { ActionModalProvider, ToastProvider } from '@moondreamsdev/dreamer-ui/providers';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layout
import { Layout } from './components/layout/Layout';

// Only import pages that are needed immediately (like LandingPage for the index route)
import { LandingPage } from './pages/LandingPage';

import { isLocalhost } from './utils/isLocalhost';
import { SpaceBackground } from './components/ui/SpaceBackground';

const showDraftRoute = isLocalhost();

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			// Landing Page
			{
				index: true,
				element: <LandingPage />,
			},
			// Background
			{
				path: 'background',
				element: <SpaceBackground/>,
			},
			// Getting Started Page
			{
				path: 'getting-started',
				lazy: async () => {
					const { GettingStartedPage } = await import('./pages/GettingStartedPage');
					return { Component: GettingStartedPage };
				},
			},
			// Components Index
			{
				path: 'components',
				lazy: async () => {
					const { ComponentsPage } = await import('./pages/components/_ComponentsPage');
					return { Component: ComponentsPage };
				},
			},
			// Component Pages
			{
				path: 'components/accordion',
				lazy: async () => {
					const { AccordionPage } = await import('./pages/components/AccordionPage');
					return { Component: AccordionPage };
				},
			},
			{
				path: 'components/actionmodal',
				lazy: async () => {
					const { ActionModalPage } = await import('./pages/components/ActionModalPage');
					return { Component: ActionModalPage };
				},
			},
			{
				path: 'components/avatar',
				lazy: async () => {
					const { AvatarPage } = await import('./pages/components/AvatarPage');
					return { Component: AvatarPage };
				},
			},
			{
				path: 'components/badge',
				lazy: async () => {
					const { BadgePage } = await import('./pages/components/BadgePage');
					return { Component: BadgePage };
				},
			},
			{
				path: 'components/button',
				lazy: async () => {
					const { ButtonPage } = await import('./pages/components/ButtonPage');
					return { Component: ButtonPage };
				},
			},
			{
				path: 'components/calendar',
				lazy: async () => {
					const { CalendarPage } = await import('./pages/components/CalendarPage');
					return { Component: CalendarPage };
				},
			},
			{
				path: 'components/callout',
				lazy: async () => {
					const { CalloutPage } = await import('./pages/components/CalloutPage');
					return { Component: CalloutPage };
				},
			},
			{
				path: 'components/card',
				lazy: async () => {
					const { CardPage } = await import('./pages/components/CardPage');
					return { Component: CardPage };
				},
			},
			{
				path: 'components/carousel',
				lazy: async () => {
					const { CarouselPage } = await import('./pages/components/CarouselPage');
					return { Component: CarouselPage };
				},
			},
			{
				path: 'components/checkbox',
				lazy: async () => {
					const { CheckboxPage } = await import('./pages/components/CheckboxPage');
					return { Component: CheckboxPage };
				},
			},
			{
				path: 'components/clickable',
				lazy: async () => {
					const { ClickablePage } = await import('./pages/components/ClickablePage');
					return { Component: ClickablePage };
				},
			},
			{
				path: 'components/code',
				lazy: async () => {
					const { CodePage } = await import('./pages/components/CodePage');
					return { Component: CodePage };
				},
			},
			{
				path: 'components/codeblock',
				lazy: async () => {
					const { CodeBlockPage } = await import('./pages/components/CodeBlockPage');
					return { Component: CodeBlockPage };
				},
			},
			{
				path: 'components/disclosure',
				lazy: async () => {
					const { DisclosurePage } = await import('./pages/components/DisclosurePage');
					return { Component: DisclosurePage };
				},
			},
			{
				path: 'components/drawer',
				lazy: async () => {
					const { DrawerPage } = await import('./pages/components/DrawerPage');
					return { Component: DrawerPage };
				},
			},
			{
				path: 'components/dropdown-menu',
				lazy: async () => {
					const { DropdownMenuPage } = await import('./pages/components/DropdownMenuPage');
					return { Component: DropdownMenuPage };
				},
			},
			{
				path: 'components/dynamic-list',
				lazy: async () => {
					const { DynamicListPage } = await import('./pages/components/DynamicListPage');
					return { Component: DynamicListPage };
				},
			},
			{
				path: 'components/error-boundary',
				lazy: async () => {
					const { ErrorBoundaryPage } = await import('./pages/components/ErrorBoundaryPage');
					return { Component: ErrorBoundaryPage };
				},
			},
			{
				path: 'components/form',
				lazy: async () => {
					const { FormPage } = await import('./pages/components/FormPage');
					return { Component: FormPage };
				},
			},
			{
				path: 'components/help-icon',
				lazy: async () => {
					const { HelpIconPage } = await import('./pages/components/HelpIconPage');
					return { Component: HelpIconPage };
				},
			},
			{
				path: 'components/input',
				lazy: async () => {
					const { InputPage } = await import('./pages/components/InputPage');
					return { Component: InputPage };
				},
			},
			{
				path: 'components/label',
				lazy: async () => {
					const { LabelPage } = await import('./pages/components/LabelPage');
					return { Component: LabelPage };
				},
			},
			{
				path: 'components/modal',
				lazy: async () => {
					const { ModalPage } = await import('./pages/components/ModalPage');
					return { Component: ModalPage };
				},
			},
			{
				path: 'components/pagination',
				lazy: async () => {
					const { PaginationPage } = await import('./pages/components/PaginationPage');
					return { Component: PaginationPage };
				},
			},
			{
				path: 'components/panel',
				lazy: async () => {
					const { PanelPage } = await import('./pages/components/PanelPage');
					return { Component: PanelPage };
				},
			},
			{
				path: 'components/popover',
				lazy: async () => {
					const { PopoverPage } = await import('./pages/components/PopoverPage');
					return { Component: PopoverPage };
				},
			},
			{
				path: 'components/radiogroup',
				lazy: async () => {
					const { RadioGroupPage } = await import('./pages/components/RadioGroupPage');
					return { Component: RadioGroupPage };
				},
			},
			{
				path: 'components/scroll-area',
				lazy: async () => {
					const { ScrollAreaPage } = await import('./pages/components/ScrollAreaPage');
					return { Component: ScrollAreaPage };
				},
			},
			{
				path: 'components/select',
				lazy: async () => {
					const { SelectPage } = await import('./pages/components/SelectPage');
					return { Component: SelectPage };
				},
			},
			{
				path: 'components/separator',
				lazy: async () => {
					const { SeparatorPage } = await import('./pages/components/SeparatorPage');
					return { Component: SeparatorPage };
				},
			},
			{
				path: 'components/skeleton',
				lazy: async () => {
					const { SkeletonPage } = await import('./pages/components/SkeletonPage');
					return { Component: SkeletonPage };
				},
			},
			{
				path: 'components/slider',
				lazy: async () => {
					const { SliderPage } = await import('./pages/components/SliderPage');
					return { Component: SliderPage };
				},
			},
			{
				path: 'components/table',
				lazy: async () => {
					const { TablePage } = await import('./pages/components/TablePage');
					return { Component: TablePage };
				},
			},
			{
				path: 'components/tabs',
				lazy: async () => {
					const { TabsPage } = await import('./pages/components/TabsPage');
					return { Component: TabsPage };
				},
			},
			{
				path: 'components/textarea',
				lazy: async () => {
					const { TextareaPage } = await import('./pages/components/TextareaPage');
					return { Component: TextareaPage };
				},
			},
			{
				path: 'components/toast',
				lazy: async () => {
					const { ToastPage } = await import('./pages/components/ToastPage');
					return { Component: ToastPage };
				},
			},
			{
				path: 'components/toggle',
				lazy: async () => {
					const { TogglePage } = await import('./pages/components/TogglePage');
					return { Component: TogglePage };
				},
			},
			{
				path: 'components/tooltip',
				lazy: async () => {
					const { TooltipPage } = await import('./pages/components/TooltipPage');
					return { Component: TooltipPage };
				},
			},
			// Draft Page - Only available on localhost
			...(showDraftRoute ? [{
				path: 'draft',
				lazy: async () => {
					const { DraftPage } = await import('./pages/DraftPage');
					return { Component: DraftPage };
				},
			}] : []),
		],
	},
]);

function App() {
	return (
		<ActionModalProvider>
			<ToastProvider position='top-center'>
				<RouterProvider router={router} />
			</ToastProvider>
		</ActionModalProvider>
	);
}

export default App;
