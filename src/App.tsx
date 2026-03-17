import { useState, useCallback, useEffect, useMemo, useLayoutEffect } from 'react';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { WineShowcase } from './sections/WineShowcase';
import { WineryCarousel } from './sections/WineryCarousel';
import { Museum } from './sections/Museum';
import { News } from './sections/News';
import { ContactForm } from './sections/ContactForm';
import { Footer } from './sections/Footer';
import { Preloader } from './components/Preloader';
import { ScrollToTop } from './components/ScrollToTop';
import { applyContent } from './config';
import { fetchSanityContent } from './lib/sanity';
import { HomeOverview } from './sections/HomeOverview';
import { LanguageContext, type LanguageCode } from './lib/i18n';
import { getActiveLanguage, setActiveLanguage } from './lib/contentLoader';
import { HomepageHighlights } from './sections/HomepageHighlights';
import { AreaDomainDetail } from './sections/AreaDomainDetail';
import { Insights } from './sections/Insights';

const ENABLE_SANITY_RUNTIME = import.meta.env.VITE_ENABLE_SANITY === 'true';

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return sessionStorage.getItem('pag_preloader_seen') !== '1';
    } catch {
      return true;
    }
  });
  const [, setContentVersion] = useState(0);
  const [language, setLanguage] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('pag_language');
      return saved === 'ar' ? 'ar' : getActiveLanguage();
    } catch {
      return getActiveLanguage();
    }
  });
  const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';
  const [pathname, setPathname] = useState(normalizePath(window.location.pathname));

  const handlePreloaderComplete = useCallback(() => {
    try {
      sessionStorage.setItem('pag_preloader_seen', '1');
    } catch {
      // Ignore storage errors (private mode / blocked storage)
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setActiveLanguage(language);
    applyContent({});

    try {
      localStorage.setItem('pag_language', language);
    } catch {
      // Ignore storage errors
    }

    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    let mounted = true;

    const loadCmsContent = async () => {
      if (!ENABLE_SANITY_RUNTIME || language !== 'en') return;
      const remoteContent = await fetchSanityContent();
      if (mounted && remoteContent) {
        applyContent(remoteContent);
        setContentVersion((v) => v + 1);
      }
    };

    void loadCmsContent();

    return () => {
      mounted = false;
    };
  }, [language]);

  useEffect(() => {
    const onPopState = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  const renderPage = () => {
    if (pathname.startsWith('/areas-of-operation/')) {
      const slug = pathname.replace('/areas-of-operation/', '');
      return <AreaDomainDetail slug={slug} />;
    }

    switch (pathname) {
      case '/':
        return (
          <>
            <Hero isReady={!isLoading} />
            <HomeOverview />
            <HomepageHighlights />
          </>
        );
      case '/about':
        return <Museum />;
      case '/capabilities':
      case '/partnerships':
      case '/insights':
        return <Insights />;
      case '/areas-of-operation':
      case '/activity-domains':
        return <WineShowcase />;
      case '/initiatives':
      case '/operating-model':
        return <WineryCarousel />;
      case '/regional-presence':
        return <News />;
      case '/contact':
        return <ContactForm />;
      default:
        return <Hero isReady={!isLoading} />;
    }
  };

  const languageContextValue = useMemo(() => ({
    language,
    setLanguage,
  }), [language]);

  return (
    <LanguageContext.Provider value={languageContextValue}>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className={`min-h-screen bg-[#f6f8fb] ${isLoading ? 'overflow-hidden max-h-screen' : ''}`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="site-backdrop" />
        <Navigation />

        <main id="main-content" tabIndex={-1} className="pt-20 md:pt-24 min-h-[calc(100vh+240px)] page-fade-in relative z-10">
          {renderPage()}
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
