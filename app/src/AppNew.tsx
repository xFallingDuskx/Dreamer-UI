import { ActionModalProvider, ToastProvider } from '@moondreamsdev/dreamer-ui/providers';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Layout
import { Layout } from './components/layout/Layout';

// Pages
import { DraftPage } from './pages/DraftPage';
import { GettingStartedPage } from './pages/GettingStartedPage';
import { LandingPage } from './pages/LandingPage';
import { ComponentsPage } from './pages/components/_ComponentsPage';

// Component Pages
import { AccordionPage } from './pages/components/AccordionPage';
import { ActionModalPage } from './pages/components/ActionModalPage';
import { AvatarPage } from './pages/components/AvatarPage';
import { BadgePage } from './pages/components/BadgePage';
import { ButtonPage } from './pages/components/ButtonPage';
import { CalendarPage } from './pages/components/CalendarPage';
import { CalloutPage } from './pages/components/CalloutPage';
import { CardPage } from './pages/components/CardPage';
import { CarouselPage } from './pages/components/CarouselPage';
import { CheckboxPage } from './pages/components/CheckboxPage';
import { ClickablePage } from './pages/components/ClickablePage';
import { CodeBlockPage } from './pages/components/CodeBlockPage';
import { CodePage } from './pages/components/CodePage';
import { DisclosurePage } from './pages/components/DisclosurePage';
import { DrawerPage } from './pages/components/DrawerPage';
import { DropdownMenuPage } from './pages/components/DropdownMenuPage';
import { DynamicListPage } from './pages/components/DynamicListPage';
import { ErrorBoundaryPage } from './pages/components/ErrorBoundaryPage';
import { FormPage } from './pages/components/FormPage';
import { InputPage } from './pages/components/InputPage';
import { LabelPage } from './pages/components/LabelPage';
import { ModalPage } from './pages/components/ModalPage';
import { PaginationPage } from './pages/components/PaginationPage';
import { PanelPage } from './pages/components/PanelPage';
import { PopoverPage } from './pages/components/PopoverPage';
import { RadioGroupPage } from './pages/components/RadioGroupPage';
import { ScrollAreaPage } from './pages/components/ScrollAreaPage';
import { SelectPage } from './pages/components/SelectPage';
import { SeparatorPage } from './pages/components/SeparatorPage';
import { SkeletonPage } from './pages/components/SkeletonPage';
import { SliderPage } from './pages/components/SliderPage';
import { TablePage } from './pages/components/TablePage';
import { TabsPage } from './pages/components/TabsPage';
import { TextareaPage } from './pages/components/TextareaPage';
import { ToastPage } from './pages/components/ToastPage';
import { TogglePage } from './pages/components/TogglePage';
import { TooltipPage } from './pages/components/TooltipPage';

import { isLocalhost } from './utils/isLocalhost';

function App() {
	const showDraftRoute = isLocalhost();

	return (
		<ActionModalProvider>
			<ToastProvider position='top-center'>
				<Router>
					<Routes>
						<Route path='/' element={<Layout />}>
							{/* Landing Page */}
							<Route index element={<LandingPage />} />

							{/* Getting Started Page */}
							<Route path='getting-started' element={<GettingStartedPage />} />

							{/* Components Index */}
							<Route path='components' element={<ComponentsPage />} />

							{/* Component Pages */}
							<Route path='components/accordion' element={<AccordionPage />} />
							<Route path='components/actionmodal' element={<ActionModalPage />} />
							<Route path='components/avatar' element={<AvatarPage />} />
							<Route path='components/badge' element={<BadgePage />} />
							<Route path='components/button' element={<ButtonPage />} />
							<Route path='components/calendar' element={<CalendarPage />} />
							<Route path='components/callout' element={<CalloutPage />} />
							<Route path='components/card' element={<CardPage />} />
							<Route path='components/carousel' element={<CarouselPage />} />
							<Route path='components/checkbox' element={<CheckboxPage />} />
							<Route path='components/clickable' element={<ClickablePage />} />
							<Route path='components/code' element={<CodePage />} />
							<Route path='components/codeblock' element={<CodeBlockPage />} />
							<Route path='components/disclosure' element={<DisclosurePage />} />
							<Route path='components/drawer' element={<DrawerPage />} />
							<Route path='components/dropdown-menu' element={<DropdownMenuPage />} />
							<Route path='components/dynamic-list' element={<DynamicListPage />} />
							<Route path='components/error-boundary' element={<ErrorBoundaryPage />} />
							<Route path='components/form' element={<FormPage />} />
							<Route path='components/input' element={<InputPage />} />
							<Route path='components/label' element={<LabelPage />} />
							<Route path='components/modal' element={<ModalPage />} />
							<Route path='components/pagination' element={<PaginationPage />} />
							<Route path='components/panel' element={<PanelPage />} />
							<Route path='components/popover' element={<PopoverPage />} />
							<Route path='components/radiogroup' element={<RadioGroupPage />} />
							<Route path='components/scroll-area' element={<ScrollAreaPage />} />
							<Route path='components/select' element={<SelectPage />} />
							<Route path='components/separator' element={<SeparatorPage />} />
							<Route path='components/skeleton' element={<SkeletonPage />} />
							<Route path='components/slider' element={<SliderPage />} />
							<Route path='components/table' element={<TablePage />} />
							<Route path='components/tabs' element={<TabsPage />} />
							<Route path='components/textarea' element={<TextareaPage />} />
							<Route path='components/toast' element={<ToastPage />} />
							<Route path='components/toggle' element={<TogglePage />} />
							<Route path='components/tooltip' element={<TooltipPage />} />

							{/* Draft Page - Only available on localhost */}
							{showDraftRoute && <Route path='draft' element={<DraftPage />} />}
						</Route>
					</Routes>
				</Router>
			</ToastProvider>
		</ActionModalProvider>
	);
}

export default App;
