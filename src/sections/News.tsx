import { Building2, BusFront, Globe2, Landmark, Shield, Wrench } from 'lucide-react';
import { newsConfig } from '../config';
import { t, useLanguage } from '../lib/i18n';

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

export function News() {
  const { language } = useLanguage();
  if (!newsConfig.mainTitle) return null;

  const partnerSignals = [
    { label: 'Government', Icon: Landmark },
    { label: 'Infrastructure', Icon: Building2 },
    { label: 'Mobility', Icon: BusFront },
    { label: 'Technology', Icon: Globe2 },
    { label: 'Security', Icon: Shield },
    { label: 'Operations', Icon: Wrench },
  ];

  const marqueeItems = [...partnerSignals, ...partnerSignals];

  return (
    <section id="presence" className="mq-section mq-inner-section bg-slate-50 border-y border-slate-200">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="mq-kicker">
            {newsConfig.subtitle}
          </span>
          <h2 className="mq-title mb-3">{newsConfig.mainTitle}</h2>
          <p className="mq-copy max-w-2xl mx-auto">
            {t(language, 'presenceIntro')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsConfig.articles.map((item) => (
            <article key={item.id} className="mq-card overflow-hidden p-0">
              <img src={item.image} alt={item.title} className="w-full h-44 object-cover" loading="lazy" />
              <div className="p-5">
                <p className="text-xs text-gold-700 uppercase tracking-[0.15em] mb-2">{item.category}</p>
                <h3 className="font-sans text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{withSinoAfricaLink(item.excerpt)}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 bg-white border border-slate-200 rounded-lg p-6 lg:p-8">
          <p className="text-sm text-gold-700 uppercase tracking-[0.2em] mb-5 text-center">{t(language, 'trustedNetworks')}</p>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
            <div className="marquee-forward flex w-max gap-4 px-4 py-4 will-change-transform">
              {marqueeItems.map((item, index) => {
                const Icon = item.Icon;
                return (
                  <div
                    key={`${item.label}-${index}`}
                    className="flex min-w-[190px] items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#38469D]/8 border border-[#38469D]/15">
                      <Icon className="w-4 h-4 text-[#38469D]" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-700">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {newsConfig.testimonials.map((item) => (
            <article key={item.name} className="bg-white border border-slate-200 rounded-lg p-6">
              <p className="text-xs text-gold-700 uppercase tracking-[0.15em] mb-2">{item.role}</p>
              <h3 className="font-sans text-lg font-semibold text-slate-900 mb-2">{item.name}</h3>
              <p className="text-slate-600 text-sm">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '1', label: 'Headquarters' },
            { value: '1', label: 'Regional Operations Platform' },
            { value: '2', label: 'East Africa Markets' },
            { value: '5', label: 'Stakeholder Categories' },
          ].map((item) => (
            <div key={item.label} className="bg-white border border-slate-200 rounded-lg p-5 text-center">
              <p className="text-2xl font-bold text-slate-900 mb-1">{item.value}</p>
              <p className="text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
