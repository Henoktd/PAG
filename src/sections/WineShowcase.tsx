import { ArrowRight } from 'lucide-react';
import { activityDomainsConfig } from '../config';
import { CorridorMap } from '../components/CorridorMap';
import { t, useLanguage } from '../lib/i18n';

export function WineShowcase() {
  const { language } = useLanguage();
  if (!activityDomainsConfig.mainTitle || activityDomainsConfig.domains.length === 0) return null;

  const items = activityDomainsConfig.domains;
  const goTo = (href: string) => {
    const current = window.location.pathname.replace(/\/+$/, '') || '/';
    const target = href.replace(/\/+$/, '') || '/';
    if (current !== target) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section id="activities" className="mq-section mq-inner-section">
      <div className="container-custom">
        <div className="text-center mb-12">
          {activityDomainsConfig.subtitle && (
            <span className="mq-kicker">
              {activityDomainsConfig.subtitle}
            </span>
          )}
          <h2 className="mq-title mb-3">{activityDomainsConfig.mainTitle}</h2>
          <p className="mq-copy max-w-2xl mx-auto">
            {t(language, 'activityIntro')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <article key={item.id} className="mq-card">
              {item.image && (
                <div className="relative mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-44 object-cover rounded-md"
                    loading="lazy"
                  />
                  {item.id === 'smart-mobility' && (
                    <img
                      src="/images/drone-platform.jpg"
                      alt="Drone platform"
                      className="absolute bottom-2 right-2 w-24 h-16 object-cover rounded-sm border-2 border-white shadow-md"
                      loading="lazy"
                    />
                  )}
                </div>
              )}
              <h3 className="font-sans text-xl font-semibold text-slate-900 mb-2">
                {item.name} {item.subtitle}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>
              {item.detail && <p className="text-slate-500 text-sm leading-relaxed mb-3">{item.detail}</p>}
              {item.focusAreas.length > 0 && (
                <ul className="text-xs text-slate-600 space-y-1">
                  {item.focusAreas.map((focusArea) => (
                    <li key={focusArea}>- {focusArea}</li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => goTo(`/areas-of-operation/${item.id}`)}
                className="mt-4 text-sm font-semibold text-[#38469D] hover:text-[#F39D4C] transition-colors"
              >
                View Domain
              </button>
            </article>
          ))}
        </div>

        <div className="mt-10 mq-panel p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex-1 w-full">
              <p className="mq-kicker !mb-2">{t(language, 'corridorMapKicker')}</p>
              <h3 className="font-sans text-2xl font-semibold text-slate-900 mb-4">{t(language, 'operatingAreas')}</h3>
              <p className="mq-copy text-base mb-5">
                Corridor map used to support mandate scoping, partner coordination, and execution sequencing discussions.
              </p>

              <CorridorMap />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => {
              const current = window.location.pathname.replace(/\/+$/, '') || '/';
              const target = '/contact';
              if (current !== target) {
                window.history.pushState({}, '', target);
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }}
            className="btn-primary rounded-sm inline-flex items-center gap-2"
            aria-label="Institutional Contact"
          >
            {t(language, 'contactCta')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
