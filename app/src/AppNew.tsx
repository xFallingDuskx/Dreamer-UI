import { ActionModalProvider, ToastProvider } from '@moondreamsdev/dreamer-ui/providers';
import { 
	createBrowserRouter, 
	createRoutesFromElements, 
	Route, 
	RouterProvider 
} from 'react-router-dom';

// Layout
import { Layout } from './components/layout/Layout';

// Only import pages that are needed immediately (like LandingPage for the index route)
import { LandingPage } from './pages/LandingPage';

import { isLocalhost } from './utils/isLocalhost';

const showDraftRoute = isLocalhost();

const routes = createRoutesFromElements(
	<Route path='/' element={<Layout />}>
		{/* Landing Page */}
		<Route index element={<LandingPage />} />

		{/* Getting Started Page */}
		<Route 
			path='getting-started' 
			lazy={async () => {
				const { GettingStartedPage } = await import('./pages/GettingStartedPage');
				return { Component: GettingStartedPage };
			}} 
		/>

		{/* Components Index */}
		<Route 
			path='components' 
			lazy={async () => {
				const { ComponentsPage } = await import('./pages/components/_ComponentsPage');
				return { Component: ComponentsPage };
			}} 
		/>

		{/* Component Pages */}
		<Route 
			path='components/accordion' 
			lazy={async () => {
				const { AccordionPage } = await import('./pages/components/AccordionPage');
				return { Component: AccordionPage };
			}} 
		/>
		<Route 
			path='components/actionmodal' 
			lazy={async () => {
				const { ActionModalPage } = await import('./pages/components/ActionModalPage');
				return { Component: ActionModalPage };
			}} 
		/>
		<Route 
			path='components/avatar' 
			lazy={async () => {
				const { AvatarPage } = await import('./pages/components/AvatarPage');
				return { Component: AvatarPage };
			}} 
		/>
		<Route 
			path='components/badge' 
			lazy={async () => {
				const { BadgePage } = await import('./pages/components/BadgePage');
				return { Component: BadgePage };
			}} 
		/>
		<Route 
			path='components/button' 
			lazy={async () => {
				const { ButtonPage } = await import('./pages/components/ButtonPage');
				return { Component: ButtonPage };
			}} 
		/>
		<Route 
			path='components/calendar' 
			lazy={async () => {
				const { CalendarPage } = await import('./pages/components/CalendarPage');
				return { Component: CalendarPage };
			}} 
		/>
		<Route 
			path='components/callout' 
			lazy={async () => {
				const { CalloutPage } = await import('./pages/components/CalloutPage');
				return { Component: CalloutPage };
			}} 
		/>
		<Route 
			path='components/card' 
			lazy={async () => {
				const { CardPage } = await import('./pages/components/CardPage');
				return { Component: CardPage };
			}} 
		/>
		<Route 
			path='components/carousel' 
			lazy={async () => {
				const { CarouselPage } = await import('./pages/components/CarouselPage');
				return { Component: CarouselPage };
			}} 
		/>
		<Route 
			path='components/checkbox' 
			lazy={async () => {
				const { CheckboxPage } = await import('./pages/components/CheckboxPage');
				return { Component: CheckboxPage };
			}} 
		/>
		<Route 
			path='components/clickable' 
			lazy={async () => {
				const { ClickablePage } = await import('./pages/components/ClickablePage');
				return { Component: ClickablePage };
			}} 
		/>
		<Route 
			path='components/code' 
			lazy={async () => {
				const { CodePage } = await import('./pages/components/CodePage');
				return { Component: CodePage };
			}} 
		/>
		<Route 
			path='components/codeblock' 
			lazy={async () => {
				const { CodeBlockPage } = await import('./pages/components/CodeBlockPage');
				return { Component: CodeBlockPage };
			}} 
		/>
		<Route 
			path='components/disclosure' 
			lazy={async () => {
				const { DisclosurePage } = await import('./pages/components/DisclosurePage');
				return { Component: DisclosurePage };
			}} 
		/>
		<Route 
			path='components/drawer' 
			lazy={async () => {
				const { DrawerPage } = await import('./pages/components/DrawerPage');
				return { Component: DrawerPage };
			}} 
		/>
		<Route 
			path='components/dropdown-menu' 
			lazy={async () => {
				const { DropdownMenuPage } = await import('./pages/components/DropdownMenuPage');
				return { Component: DropdownMenuPage };
			}} 
		/>
		<Route 
			path='components/dynamic-list' 
			lazy={async () => {
				const { DynamicListPage } = await import('./pages/components/DynamicListPage');
				return { Component: DynamicListPage };
			}} 
		/>
		<Route 
			path='components/error-boundary' 
			lazy={async () => {
				const { ErrorBoundaryPage } = await import('./pages/components/ErrorBoundaryPage');
				return { Component: ErrorBoundaryPage };
			}} 
		/>
		<Route 
			path='components/form' 
			lazy={async () => {
				const { FormPage } = await import('./pages/components/FormPage');
				return { Component: FormPage };
			}} 
		/>
		<Route 
			path='components/help-icon' 
			lazy={async () => {
				const { HelpIconPage } = await import('./pages/components/HelpIconPage');
				return { Component: HelpIconPage };
			}} 
		/>
		<Route 
			path='components/input' 
			lazy={async () => {
				const { InputPage } = await import('./pages/components/InputPage');
				return { Component: InputPage };
			}} 
		/>
		<Route 
			path='components/label' 
			lazy={async () => {
				const { LabelPage } = await import('./pages/components/LabelPage');
				return { Component: LabelPage };
			}} 
		/>
		<Route 
			path='components/modal' 
			lazy={async () => {
				const { ModalPage } = await import('./pages/components/ModalPage');
				return { Component: ModalPage };
			}} 
		/>
		<Route 
			path='components/pagination' 
			lazy={async () => {
				const { PaginationPage } = await import('./pages/components/PaginationPage');
				return { Component: PaginationPage };
			}} 
		/>
		<Route 
			path='components/panel' 
			lazy={async () => {
				const { PanelPage } = await import('./pages/components/PanelPage');
				return { Component: PanelPage };
			}} 
		/>
		<Route 
			path='components/popover' 
			lazy={async () => {
				const { PopoverPage } = await import('./pages/components/PopoverPage');
				return { Component: PopoverPage };
			}} 
		/>
		<Route 
			path='components/radiogroup' 
			lazy={async () => {
				const { RadioGroupPage } = await import('./pages/components/RadioGroupPage');
				return { Component: RadioGroupPage };
			}} 
		/>
		<Route 
			path='components/scroll-area' 
			lazy={async () => {
				const { ScrollAreaPage } = await import('./pages/components/ScrollAreaPage');
				return { Component: ScrollAreaPage };
			}} 
		/>
		<Route 
			path='components/select' 
			lazy={async () => {
				const { SelectPage } = await import('./pages/components/SelectPage');
				return { Component: SelectPage };
			}} 
		/>
		<Route 
			path='components/separator' 
			lazy={async () => {
				const { SeparatorPage } = await import('./pages/components/SeparatorPage');
				return { Component: SeparatorPage };
			}} 
		/>
		<Route 
			path='components/skeleton' 
			lazy={async () => {
				const { SkeletonPage } = await import('./pages/components/SkeletonPage');
				return { Component: SkeletonPage };
			}} 
		/>
		<Route 
			path='components/slider' 
			lazy={async () => {
				const { SliderPage } = await import('./pages/components/SliderPage');
				return { Component: SliderPage };
			}} 
		/>
		<Route 
			path='components/table' 
			lazy={async () => {
				const { TablePage } = await import('./pages/components/TablePage');
				return { Component: TablePage };
			}} 
		/>
		<Route 
			path='components/tabs' 
			lazy={async () => {
				const { TabsPage } = await import('./pages/components/TabsPage');
				return { Component: TabsPage };
			}} 
		/>
		<Route 
			path='components/textarea' 
			lazy={async () => {
				const { TextareaPage } = await import('./pages/components/TextareaPage');
				return { Component: TextareaPage };
			}} 
		/>
		<Route 
			path='components/toast' 
			lazy={async () => {
				const { ToastPage } = await import('./pages/components/ToastPage');
				return { Component: ToastPage };
			}} 
		/>
		<Route 
			path='components/toggle' 
			lazy={async () => {
				const { TogglePage } = await import('./pages/components/TogglePage');
				return { Component: TogglePage };
			}} 
		/>
		<Route 
			path='components/tooltip' 
			lazy={async () => {
				const { TooltipPage } = await import('./pages/components/TooltipPage');
				return { Component: TooltipPage };
			}} 
		/>

		{/* Draft Page - Only available on localhost */}
		{showDraftRoute && (
			<Route 
				path='draft' 
				lazy={async () => {
					const { DraftPage } = await import('./pages/DraftPage');
					return { Component: DraftPage };
				}} 
			/>
		)}
	</Route>
);

const router = createBrowserRouter(routes);

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
