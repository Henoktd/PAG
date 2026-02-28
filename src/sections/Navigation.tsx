import { useState, useEffect } from 'react';
import { Menu, X, Home, BookOpen, Users, Mail, Grape, MapPin } from 'lucide-react';
import { navigationConfig } from '../config';
import { getNavLabel, t, type LanguageCode, useLanguage } from '../lib/i18n';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, BookOpen, Users, Mail, Grape, MapPin,
};

export function Navigation() {
  const isConfigured = Boolean(navigationConfig.brandName);
  const { language, setLanguage } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!isConfigured) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (scrollTop / max) * 100 : 0;
      setScrollProgress(progress);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isConfigured]);

  useEffect(() => {
    if (!isConfigured) return;

    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isConfigured, isMobileMenuOpen]);

  const goTo = (href: string) => {
    const current = window.location.pathname.replace(/\/+$/, '') || '/';
    const target = href.replace(/\/+$/, '') || '/';
    if (current !== target) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = isConfigured
    ? navigationConfig.navLinks.map((link) => ({
      ...link,
      name: getNavLabel(language, link.href, link.name),
    }))
    : [];
  const pathname = (window.location.pathname.replace(/\/+$/, '') || '/');

  if (!isConfigured) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md py-3 border-b border-slate-200'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-200/70'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-custom flex items-center justify-between">
        <button onClick={() => goTo('/')} className="flex items-center gap-3 group" aria-label={navigationConfig.brandName}>
          <img src="/brand/pag-logo-symbol.png" alt="PAG logo" className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110" />
          <div className="flex flex-col">
            <span className="font-sans text-xl font-semibold text-[#38469D] tracking-wide">{navigationConfig.brandName}</span>
            <span className="text-[10px] text-[#f39d4c] tracking-widest uppercase">{navigationConfig.tagline}</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8" role="menubar">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => goTo(link.href)}
              className={`text-sm transition-colors duration-300 py-2 ${
                pathname === (link.href.replace(/\/+$/, '') || '/') ? 'text-[#f39d4c] font-semibold' : 'text-slate-700 hover:text-[#f39d4c]'
              }`}
              role="menuitem"
              aria-current={pathname === (link.href.replace(/\/+$/, '') || '/') ? 'page' : undefined}
            >
              {link.name}
            </button>
          ))}
          <label className="sr-only" htmlFor="language-selector-desktop">{t(language, 'language')}</label>
          <select
            id="language-selector-desktop"
            value={language}
            onChange={(event) => setLanguage(event.target.value as LanguageCode)}
            className="text-xs border border-slate-300 rounded-sm bg-white px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#f39d4c]"
            aria-label={t(language, 'language')}
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>
        </div>

        <button
          className="lg:hidden p-2 text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`lg:hidden fixed inset-0 top-[72px] bg-white/98 backdrop-blur-lg transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        role="menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="container-custom py-8 flex flex-col gap-2">
          <div className="mb-2">
            <label className="sr-only" htmlFor="language-selector-mobile">{t(language, 'language')}</label>
            <select
              id="language-selector-mobile"
              value={language}
              onChange={(event) => setLanguage(event.target.value as LanguageCode)}
              className="w-full text-sm border border-slate-300 rounded-sm bg-white px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#f39d4c]"
              aria-label={t(language, 'language')}
            >
              <option value="en">English (EN)</option>
              <option value="ar">Arabic (AR)</option>
            </select>
          </div>
          {navLinks.map((link, index) => {
            const IconComponent = iconMap[link.icon];
            return (
              <button
                key={link.name}
                onClick={() => goTo(link.href)}
                className="flex items-center gap-3 w-full py-4 text-lg text-slate-900 border-b border-slate-200 hover:text-[#f39d4c] transition-colors animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="menuitem"
              >
                {IconComponent && <IconComponent className="w-5 h-5 text-[#f39d4c]" />}
                {link.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] bg-[#f39d4c] transition-[width] duration-200" style={{ width: `${scrollProgress}%` }} />
    </nav>
  );
}
