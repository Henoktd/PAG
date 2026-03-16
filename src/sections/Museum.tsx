import { museumConfig } from '../config';

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

export function Museum() {
  if (!museumConfig.mainTitle) return null;

  return (
    <section id="about" className="mq-section mq-inner-section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
          <div>
            <span className="mq-kicker">
              {museumConfig.subtitle}
            </span>
            <h2 className="mq-title mb-5">{museumConfig.mainTitle}</h2>
            <p className="mq-copy mb-8 max-w-3xl">{museumConfig.introText}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {museumConfig.timeline.slice(0, 4).map((event) => (
                <div key={event.year} className="mq-card p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-gold-700 mb-2">{event.year}</p>
                  <p className="text-slate-700 text-sm leading-relaxed">{event.event}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mq-panel p-6 lg:sticky lg:top-28">
            {museumConfig.founderPhoto && (
              <img
                src={museumConfig.founderPhoto}
                alt={museumConfig.founderPhotoAlt || museumConfig.mainTitle}
                className="w-full h-64 md:h-72 object-cover rounded-md mb-5"
                loading="lazy"
              />
            )}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold-700 mb-2">Base</p>
                <p className="font-sans text-lg font-semibold text-slate-900">{museumConfig.yearBadge}</p>
                <p className="text-slate-600 text-sm">{museumConfig.yearBadgeLabel}</p>
              </div>
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold-700 mb-2">Engagement</p>
                <p className="font-sans text-base font-semibold text-slate-900">{museumConfig.openingHours}</p>
                <p className="text-slate-600 text-sm">{museumConfig.openingHoursLabel}</p>
              </div>
            </div>
            <div className="pt-5 border-t border-slate-200">
              <p className="text-sm text-gold-700 uppercase tracking-[0.15em] mb-3">{museumConfig.quote.prefix}</p>
              <p className="text-slate-700 text-sm italic leading-relaxed">"{museumConfig.quote.text}"</p>
              <p className="text-gold-700 text-xs mt-2">— {museumConfig.quote.attribution}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 space-y-8">
          {museumConfig.tabs.slice(0, 3).map((tab, index) => (
            <div
              key={tab.id}
              className={`grid gap-6 lg:gap-8 items-center ${index % 2 === 0 ? 'lg:grid-cols-[0.95fr_1.05fr]' : 'lg:grid-cols-[1.05fr_0.95fr]'}`}
            >
              <div className={index % 2 === 0 ? '' : 'lg:order-2'}>
                {tab.image && (
                  <img
                    src={tab.image}
                    alt={tab.content.title}
                    className="w-full h-64 md:h-72 object-cover rounded-xl border border-slate-200 shadow-sm"
                    loading="lazy"
                  />
                )}
              </div>
              <div className={`mq-card p-6 md:p-8 ${index % 2 === 0 ? '' : 'lg:order-1'}`}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold-700 mb-3">{tab.name}</p>
                <h3 className="font-sans text-2xl md:text-3xl font-semibold text-slate-900 mb-4">{tab.content.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-5">{withSinoAfricaLink(tab.content.description)}</p>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                  <p className="text-sm text-slate-800 leading-relaxed">{tab.content.highlight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
