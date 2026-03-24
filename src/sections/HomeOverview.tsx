import { ArrowRight, Globe2, Layers3, ShieldCheck, Wrench } from 'lucide-react';
import { heroConfig } from '../config';

function withSinoAfricaLink(text: string) {
  const token = 'Sino Africa';
  if (!text.includes(token)) return text;
  const parts = text.split(token);
  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 && (
            <a
              href="https://www.sinoafricatrading.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#38469D] underline underline-offset-2 hover:text-[#F39D4C]"
            >
              {token}
            </a>
          )}
        </span>
      ))}
    </>
  );
}

export function HomeOverview() {
  const isConfigured = heroConfig.coreCapabilities.length > 0 || Boolean(heroConfig.institutionalOrientationText);
  const capabilityIcons = [Layers3, Globe2, ShieldCheck, Wrench];

  if (!isConfigured) return null;

  const goTo = (href: string) => {
    const current = window.location.pathname.replace(/\/+$/, '') || '/';
    const target = href.replace(/\/+$/, '') || '/';
    if (current !== target) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section className="mq-home-overview">
      <div className="container-custom">
        {heroConfig.coreCapabilities.length > 0 && (
          <div className="mb-6">
            {heroConfig.coreCapabilitiesTitle && (
              <h3 className="mq-title text-2xl md:text-3xl mb-5">{heroConfig.coreCapabilitiesTitle}</h3>
            )}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {heroConfig.coreCapabilities.map((item, idx) => (
                <article
                  key={idx}
                  className="mq-card p-5 cursor-pointer group"
                  onClick={() => goTo('/capabilities')}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-[#38469D]/8 border border-[#38469D]/15 flex items-center justify-center">
                      {(() => {
                        const Icon = capabilityIcons[idx] || Layers3;
                        return <Icon className="w-5 h-5 text-[#38469D]" />;
                      })()}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#F39D4C]" />
                  </div>
                  <h4 className="font-sans text-slate-900 font-semibold mb-2">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                  <div className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#38469D] group-hover:text-[#F39D4C] transition-colors">
                    View Capability
                  </div>
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
            <p className="mq-copy text-base">{withSinoAfricaLink(heroConfig.institutionalOrientationText)}</p>
          </div>
        )}

      </div>
    </section>
  );
}
