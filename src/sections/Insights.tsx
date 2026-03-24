import { Building2, Globe2, Layers3, Wrench } from 'lucide-react';
import { insightsConfig } from '../config';

const capabilityIcons = [Layers3, Globe2, Building2, Wrench];

function getShortPhrase(excerpt: string) {
  const firstSentence = excerpt.split('. ')[0]?.trim();
  if (!firstSentence) return excerpt;
  return firstSentence.endsWith('.') ? firstSentence : `${firstSentence}.`;
}

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

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {insightsConfig.posts.map((item, index) => {
            const Icon = capabilityIcons[index] || Layers3;
            return (
              <article key={item.id || item.slug} className="capability-flip-card">
                <div className="capability-flip-inner">
                  <div className="capability-face capability-face-front mq-card">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#38469D]/12 to-[#F39D4C]/20 border border-[#38469D]/15 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-[#38469D]" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.14em] text-gold-700 mb-3">{item.topic}</p>
                    <h3 className="font-sans text-xl font-semibold text-slate-900 mb-4">{item.title}</h3>
                    <p className="mq-copy text-base">{getShortPhrase(item.excerpt)}</p>
                    <p className="mt-5 text-xs uppercase tracking-[0.16em] text-[#38469D] font-semibold">
                      Hover or tap for full explanation
                    </p>
                  </div>

                  <div className="capability-face capability-face-back mq-card">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#F39D4C] mb-3">Full Capability</p>
                    <h3 className="font-sans text-xl font-semibold text-white mb-4">{item.title}</h3>
                    <p className="text-white/90 text-base md:text-[1.02rem] leading-relaxed">{item.excerpt}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
