import { ArrowRight, BusFront, Building2, Fingerprint, Landmark, Layers3, Shield, Wallet } from 'lucide-react';
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
  const sectorIcons = [Wallet, Fingerprint, BusFront, Landmark];
  const programIcons = [Building2, Layers3, Shield];
  const marqueeDomains = [...activityDomainsConfig.domains.slice(0, 4), ...activityDomainsConfig.domains.slice(0, 4)];
  const marqueePrograms = [...wineryCarouselConfig.slides.slice(0, 3), ...wineryCarouselConfig.slides.slice(0, 3)];

  return (
    <>
      <section className="mq-inner-section">
        <div className="container-custom">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="mq-kicker">INFRASTRUCTURE & TECHNOLOGY DOMAINS</span>
              <h2 className="mq-title text-3xl">Sector Platforms</h2>
              <p className="mq-copy text-base mt-3 max-w-2xl">
                A quick view of PAG&apos;s focus areas. Select a platform to open the full sector narrative and implementation context.
              </p>
            </div>
            <button onClick={() => goTo('/areas-of-operation')} className="btn-primary rounded-sm">
              View Sector Focus
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#38469D]/15 bg-gradient-to-r from-[#eef2ff] via-white to-[#fff5ea] shadow-sm">
            <div className="marquee flex w-max gap-4 p-4 will-change-transform">
              {marqueeDomains.map((domain, index) => (
              <article
                key={`${domain.id}-${index}`}
                className="mq-card border-t-4 border-t-[#38469D] bg-white/95 p-5 cursor-pointer group min-w-[260px] md:min-w-[290px] xl:min-w-[300px]"
                onClick={() => goTo(`/areas-of-operation/${domain.id}`)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#38469D]/12 to-[#F39D4C]/18 border border-[#38469D]/15 flex items-center justify-center">
                    {(() => {
                      const Icon = sectorIcons[index % 4] || Layers3;
                      return <Icon className="w-5 h-5 text-[#38469D]" />;
                    })()}
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#F39D4C]" />
                </div>
                <h3 className="font-sans text-sm md:text-base font-semibold text-slate-900 mb-2 leading-snug">
                  {domain.name}
                </h3>
                <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#38469D] group-hover:text-[#F39D4C] transition-colors">
                  View Domain
                </div>
              </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mq-inner-section bg-slate-50 border-y border-slate-200">
        <div className="container-custom">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="mq-kicker">PROJECTS / PROGRAMS</span>
              <h2 className="mq-title text-3xl">Infrastructure Programs</h2>
              <p className="mq-copy text-base mt-3 max-w-2xl">
                Selected program themes that show where PAG supports deployment, coordination, and long-term institutional execution.
              </p>
            </div>
            <button onClick={() => goTo('/initiatives')} className="btn-primary rounded-sm">
              View Programs
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#F39D4C]/20 bg-gradient-to-r from-white via-[#fff7ef] to-[#eef2ff] shadow-sm">
            <div className="marquee flex w-max gap-5 p-4 will-change-transform">
              {marqueePrograms.map((slide, idx) => (
              <article
                key={`${slide.title}-${idx}`}
                className="mq-card border-t-4 border-t-[#F39D4C] bg-white/95 p-5 cursor-pointer group min-w-[280px] md:min-w-[340px]"
                onClick={() => goTo('/initiatives')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#F39D4C]/18 to-[#38469D]/10 border border-[#F39D4C]/20 flex items-center justify-center">
                    {(() => {
                      const Icon = programIcons[idx] || Layers3;
                      return <Icon className="w-5 h-5 text-[#38469D]" />;
                    })()}
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#F39D4C]" />
                </div>
                <h3 className="font-sans text-base font-semibold text-slate-900 mb-2">{slide.title}</h3>
                <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#38469D] group-hover:text-[#F39D4C] transition-colors">
                  View Program
                </div>
              </article>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
