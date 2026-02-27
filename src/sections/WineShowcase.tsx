import { ArrowRight } from 'lucide-react';
import { wineShowcaseConfig } from '../config';
import { CorridorMap } from '../components/CorridorMap';

export function WineShowcase() {
  if (!wineShowcaseConfig.mainTitle || wineShowcaseConfig.wines.length === 0) return null;

  const items = wineShowcaseConfig.wines.slice(0, 3);

  return (
    <section id="activities" className="mq-section mq-inner-section">
      <div className="container-custom">
        <div className="text-center mb-12">
          {wineShowcaseConfig.subtitle && (
            <span className="mq-kicker">
              {wineShowcaseConfig.subtitle}
            </span>
          )}
          <h2 className="mq-title mb-3">{wineShowcaseConfig.mainTitle}</h2>
          <p className="mq-copy max-w-2xl mx-auto">
            Focused platform capabilities supporting institutional mandates across the UAE-East Africa corridor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <article key={item.id} className="mq-card">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover rounded-md mb-4"
                  loading="lazy"
                />
              )}
              <h3 className="font-sans text-xl font-semibold text-slate-900 mb-2">
                {item.name} {item.subtitle}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{item.tastingNotes}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 mq-panel p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex-1 w-full">
              <p className="mq-kicker !mb-2">Corridor Coverage Map</p>
              <h3 className="font-sans text-2xl font-semibold text-slate-900 mb-4">Gulf-East Africa Operating Areas</h3>
              <p className="mq-copy text-base mb-5">
                Visual reference of PAG focus points across the UAE, Djibouti, and Ethiopia, with corridor linkage across Gulf-East Africa routes.
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
            Institutional Contact
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
