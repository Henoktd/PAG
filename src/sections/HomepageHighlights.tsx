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
              <span className="mq-kicker">INFRASTRUCTURE & TECHNOLOGY DOMAINS</span>
              <h2 className="mq-title text-3xl">Sector Platforms</h2>
            </div>
            <button onClick={() => goTo('/areas-of-operation')} className="btn-primary rounded-sm">
              View Sector Focus
            </button>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {activityDomainsConfig.domains.slice(0, 4).map((domain) => (
              <article
                key={domain.id}
                className="mq-card p-4 cursor-pointer group"
                onClick={() => goTo(`/areas-of-operation/${domain.id}`)}
              >
                <img
                  src={domain.image}
                  alt={domain.name}
                  className="w-full h-24 object-cover rounded-md mb-3 transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <h3 className="font-sans text-sm md:text-base font-semibold text-slate-900 mb-2 leading-snug">
                  {domain.name}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 line-clamp-3">{domain.description}</p>
                <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#38469D] group-hover:text-[#F39D4C] transition-colors">
                  View Domain
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mq-inner-section bg-slate-50 border-y border-slate-200">
        <div className="container-custom">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="mq-kicker">PROJECTS / PROGRAMS</span>
              <h2 className="mq-title text-3xl">Infrastructure Programs</h2>
            </div>
            <button onClick={() => goTo('/initiatives')} className="btn-primary rounded-sm">
              View Programs
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
