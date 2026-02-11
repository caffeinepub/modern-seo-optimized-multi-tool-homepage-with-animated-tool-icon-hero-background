import { RouterProvider, Router } from './router';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import PdfToWordOnlineFreePage from './pages/tools/PdfToWordOnlineFreePage';

function App() {
  return (
    <RouterProvider>
      <AppLayout>
        <Router
          routes={[
            { path: '/', component: <HomePage /> },
            { path: '/about', component: <AboutPage /> },
            { path: '/contact', component: <ContactPage /> },
            { path: '/privacy', component: <PrivacyPage /> },
            { path: '/disclaimer', component: <DisclaimerPage /> },
            { path: '/terms', component: <TermsPage /> },
            { path: '/tools/pdf-to-word-online-free', component: <PdfToWordOnlineFreePage /> },
          ]}
          notFound={<NotFoundPage />}
        />
      </AppLayout>
    </RouterProvider>
  );
}

export default App;
