import { ArrowRight } from 'lucide-react';
import { wineShowcaseConfig } from '../config';

export function WineShowcase() {
  if (!wineShowcaseConfig.mainTitle || wineShowcaseConfig.wines.length === 0) return null;

  const items = wineShowcaseConfig.wines.slice(0, 3);

  return (
    <section id="activities" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          {wineShowcaseConfig.subtitle && (
            <span className="font-sans text-sm text-gold-700 uppercase tracking-[0.2em] mb-3 block">
              {wineShowcaseConfig.subtitle}
            </span>
          )}
          <h2 className="font-sans text-h2 text-slate-900 mb-3">{wineShowcaseConfig.mainTitle}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Focused platform capabilities supporting institutional mandates across the UAE-East Africa corridor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <article key={item.id} className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="font-sans text-xl font-semibold text-slate-900 mb-2">
                {item.name} {item.subtitle}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{item.tastingNotes}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
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
