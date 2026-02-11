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
import ImageCompressorOnlineFreePage from './pages/tools/ImageCompressorOnlineFreePage';
import GuidesPage from './pages/GuidesPage';
import GuideKeyboardShortcutsForFasterWorkPage from './pages/guides/GuideKeyboardShortcutsForFasterWorkPage';
import GuideOrganizeBrowserTabsAndBookmarksPage from './pages/guides/GuideOrganizeBrowserTabsAndBookmarksPage';
import GuidePdfWorkflowChecklistPage from './pages/guides/GuidePdfWorkflowChecklistPage';

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
            { path: '/guides', component: <GuidesPage /> },
            { path: '/guides/keyboard-shortcuts-faster-work', component: <GuideKeyboardShortcutsForFasterWorkPage /> },
            { path: '/guides/organize-browser-tabs-bookmarks', component: <GuideOrganizeBrowserTabsAndBookmarksPage /> },
            { path: '/guides/pdf-workflow-checklist', component: <GuidePdfWorkflowChecklistPage /> },
            { path: '/tools/pdf-to-word-online-free', component: <PdfToWordOnlineFreePage /> },
            { path: '/tools/image-compressor-online-free', component: <ImageCompressorOnlineFreePage /> },
          ]}
          notFound={<NotFoundPage />}
        />
      </AppLayout>
    </RouterProvider>
  );
}

export default App;
