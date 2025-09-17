import { ActionModalProvider, ToastProvider } from '@moondreamsdev/dreamer-ui/providers';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Layout
import { Layout } from './components/layout/Layout';

// Pages
import { DraftPage } from './pages/DraftPage';
import { GettingStartedPage } from './pages/GettingStartedPage';
import { LandingPage } from './pages/LandingPage';
import { ComponentsPage } from './pages/components/_ComponentsPage';
import { HooksPage } from './pages/hooks/_HooksPage';
import { UtilsPage } from './pages/utils/_UtilsPage';

// Component Pages
import { ButtonPage } from './pages/components/ButtonPage';
import { CodeBlockPage } from './pages/components/CodeBlockPage';
import { InputPage } from './pages/components/InputPage';
import { ModalPage } from './pages/components/ModalPage';
import { SkeletonPage } from './pages/components/SkeletonPage';
import { CalloutPage } from './pages/components/CalloutPage';
import { FormPage } from './pages/components/FormPage';
import { CardPage } from './pages/components/CardPage';
import { ErrorBoundaryPage } from './pages/components/ErrorBoundaryPage';

// Hook Pages
import { UseActionModalPage } from './pages/hooks/UseActionModalPage';
import { UseToastPage } from './pages/hooks/UseToastPage';

// Utils Pages
import { JoinPage } from './pages/utils/JoinPage';

// Utils
import { DisclosurePage } from './pages/components/DisclosurePage';
import { isLocalhost } from './utils/isLocalhost';
import { AvatarPage } from './pages/components/AvatarPage';

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
              <Route path='components/avatar' element={<AvatarPage />} />
              <Route path='components/button' element={<ButtonPage />} />
              <Route path='components/card' element={<CardPage />} />
              <Route path='components/disclosure' element={<DisclosurePage />} />
              <Route path='components/skeleton' element={<SkeletonPage />} />
              <Route path='components/input' element={<InputPage />} />
              <Route path='components/modal' element={<ModalPage />} />
              <Route path='components/codeblock' element={<CodeBlockPage />} />
              <Route path='components/callout' element={<CalloutPage />} />
              <Route path='components/error-boundary' element={<ErrorBoundaryPage />} />
              <Route path='components/form' element={<FormPage />} />

              {/* Hook Pages */}
              <Route path='hooks' element={<HooksPage />} />
              <Route path='hooks/useactionmodal' element={<UseActionModalPage />} />
              <Route path='hooks/usetoast' element={<UseToastPage />} />

              {/* Utils Pages */}
              <Route path='utils' element={<UtilsPage />} />
              <Route path='utils/join' element={<JoinPage />} />

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
