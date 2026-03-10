import { activityDomainsConfig, wineryCarouselConfig } from '../config';

function goTo(href: string) {
  const current = window.location.pathname.replace(/\/+$/, '') || '/';
  const target = href.replace(/\/+$/, '') || '/';
  if (current !== target) {
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

export function HomepageHighlights() {
  return (
    <>
      <section className="mq-inner-section">
        <div className="container-custom">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="mq-kicker">AREAS OF OPERATION</span>
              <h2 className="mq-title text-3xl">Strategic Domains</h2>
            </div>
            <button onClick={() => goTo('/areas-of-operation')} className="btn-primary rounded-sm">
              View All
            </button>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {activityDomainsConfig.domains.slice(0, 4).map((domain) => (
              <article key={domain.id} className="mq-card">
                <img src={domain.image} alt={domain.name} className="w-full h-32 object-cover rounded-md mb-3" loading="lazy" />
                <h3 className="font-sans text-base font-semibold text-slate-900 mb-2">{domain.name}</h3>
                <p className="text-sm text-slate-600">{domain.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mq-inner-section bg-slate-50 border-y border-slate-200">
        <div className="container-custom">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="mq-kicker">STRATEGIC INITIATIVES</span>
              <h2 className="mq-title text-3xl">Program Highlights</h2>
            </div>
            <button onClick={() => goTo('/initiatives')} className="btn-primary rounded-sm">
              View All
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {wineryCarouselConfig.slides.slice(0, 3).map((slide, idx) => (
              <article key={`${slide.title}-${idx}`} className="mq-card">
                <img src={slide.image} alt={slide.title} className="w-full h-32 object-cover rounded-md mb-3" loading="lazy" />
                <h3 className="font-sans text-base font-semibold text-slate-900 mb-2">{slide.title}</h3>
                <p className="text-sm text-slate-600">{slide.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
