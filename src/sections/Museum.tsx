import { ArrowRight } from 'lucide-react';
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
        <div className="mq-panel overflow-hidden p-0 mb-10">
          <img
            src={museumConfig.founderPhoto}
            alt={museumConfig.founderPhotoAlt || museumConfig.mainTitle}
            className="w-full h-[280px] md:h-[360px] lg:h-[420px] object-cover"
            loading="eager"
          />
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start mb-10">
          <div>
            <span className="mq-kicker">{museumConfig.subtitle}</span>
            <p className="mq-copy text-lg md:text-xl max-w-4xl">
              {museumConfig.introText}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="mq-card bg-[#eef2ff] border-[#38469D]/10">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gold-700 mb-2">Headquarters</p>
              <p className="font-sans text-xl font-semibold text-slate-900">{museumConfig.yearBadge}</p>
              <p className="text-slate-600 text-sm">{museumConfig.yearBadgeLabel}</p>
            </div>
            <div className="mq-card bg-[#fff7ef] border-[#F39D4C]/20">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gold-700 mb-2">Regional Operations</p>
              <p className="font-sans text-xl font-semibold text-slate-900">{museumConfig.openingHours}</p>
              <p className="text-slate-600 text-sm">{museumConfig.openingHoursLabel}</p>
            </div>
          </div>
        </div>

        <div className="mq-panel bg-gradient-to-r from-[#38469D] to-[#2c377d] text-white p-7 md:p-8 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
            <div className="lg:w-1/4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/70 mb-2">{museumConfig.quote.prefix}</p>
              <h2 className="font-sans text-2xl md:text-3xl font-semibold text-white">Mission Statement</h2>
            </div>
            <div className="lg:flex-1">
              <p className="text-lg md:text-xl leading-relaxed text-white/95">
                {museumConfig.quote.text}
              </p>
              <p className="text-sm uppercase tracking-[0.16em] text-white/70 mt-4">
                {museumConfig.quote.attribution}
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
          {museumConfig.timeline.slice(0, 4).map((event, index) => (
            <div
              key={event.year}
              className={`mq-card ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-gold-700 mb-3">{event.year}</p>
              <p className="mq-copy text-base">{event.event}</p>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          {museumConfig.tabs.slice(0, 3).map((tab, index) => (
            <div
              key={tab.id}
              className={`grid gap-6 lg:gap-8 items-center ${index % 2 === 0 ? 'lg:grid-cols-[0.95fr_1.05fr]' : 'lg:grid-cols-[1.05fr_0.95fr]'}`}
            >
              <div className={index % 2 === 0 ? '' : 'lg:order-2'}>
                {tab.image && (
                  <div className="mq-panel overflow-hidden p-0">
                    <img
                      src={tab.image}
                      alt={tab.content.title}
                      className="w-full h-64 md:h-72 lg:h-80 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
              <div className={`mq-card p-6 md:p-8 ${index % 2 === 0 ? '' : 'lg:order-1'}`}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold-700 mb-3">{tab.name}</p>
                <h3 className="font-sans text-2xl md:text-3xl font-semibold text-slate-900 mb-4">{tab.content.title}</h3>
                <p className="mq-copy text-base mb-5">{withSinoAfricaLink(tab.content.description)}</p>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 flex items-start gap-3">
                  <div className="mt-1 w-8 h-8 rounded-full bg-[#38469D]/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-[#38469D]" />
                  </div>
                  <p className="mq-copy text-base text-slate-700">{tab.content.highlight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
