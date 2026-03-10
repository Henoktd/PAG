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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {['Government', 'Infrastructure', 'Trade', 'Mobility', 'Industrial', 'Technology'].map((label) => (
              <div key={label} className="h-12 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center text-xs font-semibold text-slate-700 uppercase tracking-[0.08em]">
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <article className="bg-white border border-slate-200 rounded-lg p-6">
            <p className="text-xs text-gold-700 uppercase tracking-[0.15em] mb-2">Partner Category</p>
            <h3 className="font-sans text-lg font-semibold text-slate-900 mb-2">Global Technology Providers</h3>
            <p className="text-slate-600 text-sm">Technology partners supporting secure, scalable, and mission-critical program architectures.</p>
          </article>
          <article className="bg-white border border-slate-200 rounded-lg p-6">
            <p className="text-xs text-gold-700 uppercase tracking-[0.15em] mb-2">Partner Category</p>
            <h3 className="font-sans text-lg font-semibold text-slate-900 mb-2">Institutional Clients</h3>
            <p className="text-slate-600 text-sm">Government and institutional stakeholders requiring coordinated deployment models across markets.</p>
          </article>
          <article className="bg-white border border-slate-200 rounded-lg p-6">
            <p className="text-xs text-gold-700 uppercase tracking-[0.15em] mb-2">Partner Category</p>
            <h3 className="font-sans text-lg font-semibold text-slate-900 mb-2">Regional Execution Partners</h3>
            <p className="text-slate-600 text-sm">In-market partners enabling local engagement, operational implementation, and program continuity.</p>
          </article>
        </div>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '3', label: 'Office Locations' },
            { value: '2', label: 'Primary Corridors' },
            { value: '4', label: 'Core Activities' },
            { value: '5+', label: 'Sector Touchpoints' },
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
