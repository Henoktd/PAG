import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToTopConfig } from '../config';

export function ScrollToTop() {
  // Null check: if config is empty, render nothing
  if (!scrollToTopConfig.ariaLabel) return null;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label={scrollToTopConfig.ariaLabel}
      className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ backgroundColor: '#f39d4c', boxShadow: '0 14px 26px -14px rgba(243, 157, 76, 0.9)' }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
