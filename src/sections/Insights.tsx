import { insightsConfig } from '../config';

export function Insights() {
  if (!insightsConfig.mainTitle) return null;

  return (
    <section id="insights" className="mq-section mq-inner-section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="mq-kicker">{insightsConfig.subtitle}</span>
          <h2 className="mq-title mb-3">{insightsConfig.mainTitle}</h2>
          <p className="mq-copy max-w-2xl mx-auto">{insightsConfig.introText}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {insightsConfig.posts.map((item) => (
            <article key={item.id || item.slug} className="mq-card">
              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-md mb-3" loading="lazy" />
              )}
              <p className="text-xs uppercase tracking-[0.14em] text-gold-700 mb-2">{item.topic}</p>
              <h3 className="font-sans text-lg font-semibold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
