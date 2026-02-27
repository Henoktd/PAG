import { useState, useCallback, useEffect } from 'react';
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

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return sessionStorage.getItem('pag_preloader_seen') !== '1';
    } catch {
      return true;
    }
  });
  const [, setContentVersion] = useState(0);
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
    let mounted = true;

    const loadCmsContent = async () => {
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
  }, []);

  useEffect(() => {
    const onPopState = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const renderPage = () => {
    switch (pathname) {
      case '/':
        return (
          <>
            <Hero isReady={!isLoading} />
            <HomeOverview />
          </>
        );
      case '/about':
        return <Museum />;
      case '/activity-domains':
        return <WineShowcase />;
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

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className={`min-h-screen bg-[#f6f8fb] ${isLoading ? 'overflow-hidden max-h-screen' : ''}`}>
        <div className="site-backdrop" />
        <Navigation />

        <main className="pt-20 md:pt-24 min-h-[calc(100vh+240px)] page-fade-in relative z-10">
          {renderPage()}
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
