import { useEffect, useRef, useState } from 'react';
import { heroConfig } from '../config';

export function HomeOverview() {
  if (!heroConfig.subheading && heroConfig.positioningParagraphs.length === 0) return null;
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [activeMandate, setActiveMandate] = useState(0);

  const mandateFeed = [
    'Market-entry structuring pathway active for East Africa institutional counterpart alignment.',
    'Cross-border sourcing corridor coordination sequence validated for Gulf to Horn route.',
    'Multi-party mandate architecture in progress with governance-bounded oversight model.',
  ];
  const stripImages = [
    '/images/region-gulf.jpg',
    '/images/region-coordination.jpg',
    '/images/region-east-africa.jpg',
    '/images/activity-sourcing.jpg',
    '/images/model-structuring.jpg',
  ];

  const goTo = (href: string) => {
    const current = window.location.pathname.replace(/\/+$/, '') || '/';
    const target = href.replace(/\/+$/, '') || '/';
    if (current !== target) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  useEffect(() => {
    const node = cardsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveMandate((prev) => (prev + 1) % mandateFeed.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [mandateFeed.length]);

  return (
    <section className="mq-home-overview">
      <div className="container-custom">
        {heroConfig.subheading && (
          <p className="mq-copy max-w-4xl mx-auto text-center mb-12">
            {heroConfig.subheading}
          </p>
        )}

        {heroConfig.positioningParagraphs.length > 0 && (
          <div className="mq-panel p-6 mb-8">
            {heroConfig.positioningTitle && (
              <h3 className="mq-title text-2xl md:text-3xl mb-4">{heroConfig.positioningTitle}</h3>
            )}
            <div className="space-y-2">
              {heroConfig.positioningParagraphs.map((line, idx) => (
                <p key={idx} className="mq-copy text-base">{line}</p>
              ))}
            </div>
          </div>
        )}

        {heroConfig.coreCapabilities.length > 0 && (
          <div className="mb-6" ref={cardsRef}>
            {heroConfig.coreCapabilitiesTitle && (
              <h3 className="mq-title text-2xl md:text-3xl mb-5">{heroConfig.coreCapabilitiesTitle}</h3>
            )}
            <div className="grid md:grid-cols-3 gap-4">
              {heroConfig.coreCapabilities.map((item, idx) => (
                <article
                  key={idx}
                  className={`fade-up mq-card ${cardsVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                >
                  <img
                    src={item.image || `/images/pag-${idx + 1}.png`}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                    loading="lazy"
                  />
                  <h4 className="font-sans text-slate-900 font-semibold mb-2">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {heroConfig.institutionalOrientationText && (
          <div className="mq-panel bg-slate-50 p-6">
            {heroConfig.institutionalOrientationTitle && (
              <h3 className="mq-title text-2xl md:text-3xl mb-4">{heroConfig.institutionalOrientationTitle}</h3>
            )}
            <p className="mq-copy text-base">{heroConfig.institutionalOrientationText}</p>
          </div>
        )}

        <div className="home-art-block mt-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
          <div className="rounded-lg border border-[#38469D]/20 bg-gradient-to-br from-[#38469D] to-[#2d397f] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-[#F39D4C] mb-3">Corridor Pulse</p>
            <h3 className="font-sans font-bold text-2xl mb-3 !text-white">Live Gulf-East Africa Flow</h3>
            <p className="text-white/80 text-sm mb-6">
              A real-time style visual feed of PAG’s corridor architecture from UAE coordination to East Africa execution lanes.
            </p>

            <div className="grid sm:grid-cols-3 gap-3">
              {['Dubai, UAE', 'Djibouti', 'Addis Ababa'].map((point, idx) => (
                <div key={point} className="rounded-md bg-white/10 border border-white/20 p-3 relative overflow-hidden">
                  <span className="absolute top-2 right-2 inline-flex h-2 w-2 rounded-full bg-[#F39D4C] animate-pulse" />
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Node {idx + 1}</p>
                  <p className="text-sm font-semibold !text-white">{point}</p>
                </div>
              ))}
            </div>

            <div className="hidden md:block mt-4 rounded-md bg-white/5 border border-white/10 p-2">
              <svg viewBox="0 0 900 90" className="w-full h-10 corridor-flow-svg" aria-hidden="true">
                <path d="M20 45 C180 12, 250 12, 320 45 S520 78, 600 45 S780 12, 880 45" className="corridor-flow-line" />
              </svg>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button onClick={() => goTo('/activity-domains')} className="px-4 py-2 rounded-sm bg-[#F39D4C] text-white text-sm font-semibold hover:brightness-95 transition">
                Explore Activity Domains
              </button>
              <button onClick={() => goTo('/contact')} className="px-4 py-2 rounded-sm border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition">
                Start Institutional Inquiry
              </button>
            </div>
          </div>

          <div className="mq-panel p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[#F39D4C] mb-3">Mandate Feed</p>
            <h3 className="mq-title text-2xl md:text-3xl mb-4">Current Structuring Signals</h3>
            <div className="space-y-3">
              {mandateFeed.map((item, idx) => (
                <div
                  key={item}
                  className={`rounded-md border p-3 transition-all duration-500 ${
                    activeMandate === idx
                      ? 'border-[#F39D4C] bg-[#F39D4C]/10 shadow-sm'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-white/80 overflow-hidden">
          <div className="parallax-strip-track">
            {[...stripImages, ...stripImages].map((src, idx) => (
              <div key={`${src}-${idx}`} className="parallax-strip-item">
                <img src={src} alt="PAG corridor visual" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
