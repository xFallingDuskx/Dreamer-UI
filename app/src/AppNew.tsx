import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ActionModalProvider, ToastProvider } from '@moondreamsdev/dreamer-ui/providers';

// Layout
import { Layout } from './components/layout/Layout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { GettingStartedPage } from './pages/getting-started/_index';
import { ComponentsPage } from './pages/components/_index';
import { HooksPage } from './pages/hooks/_index';
import { UtilsPage } from './pages/utils/_index';
import { DraftPage } from './pages/draft/_index';

// Component Pages
import { ButtonPage } from './pages/components/ButtonPage';
import { SkeletonPage } from './pages/components/SkeletonPage';
import { InputPage } from './pages/components/InputPage';
import { ModalPage } from './pages/components/ModalPage';

// Hook Pages
import { UseActionModalPage } from './pages/hooks/UseActionModalPage';
import { UseToastPage } from './pages/hooks/UseToastPage';

// Utils Pages
import { JoinPage } from './pages/utils/JoinPage';

// Utils
import { isLocalhost } from './utils/isLocalhost';

function App() {
  const showDraftRoute = isLocalhost();

  return (
    <ActionModalProvider>
      <ToastProvider position='top-center'>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Landing Page */}
              <Route index element={<LandingPage />} />
              
              {/* Getting Started Page */}
              <Route path="getting-started" element={<GettingStartedPage />} />
              
              {/* Components Index */}
              <Route path="components" element={<ComponentsPage />} />
              
              {/* Component Pages */}
              <Route path="components/button" element={<ButtonPage />} />
              <Route path="components/skeleton" element={<SkeletonPage />} />
              <Route path="components/input" element={<InputPage />} />
              <Route path="components/modal" element={<ModalPage />} />
              
              {/* Hook Pages */}
              <Route path="hooks" element={<HooksPage />} />
              <Route path="hooks/useactionmodal" element={<UseActionModalPage />} />
              <Route path="hooks/usetoast" element={<UseToastPage />} />
              
              {/* Utils Pages */}
              <Route path="utils" element={<UtilsPage />} />
              <Route path="utils/join" element={<JoinPage />} />

              {/* Draft Page - Only available on localhost */}
              {showDraftRoute && (
                <Route path="draft" element={<DraftPage />} />
              )}
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </ActionModalProvider>
  );
}

export default App;