import { heroConfig } from '../config';
import { useLanguage } from '../lib/i18n';

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
  useLanguage();
  const isConfigured = Boolean(heroConfig.subheading) || heroConfig.positioningParagraphs.length > 0;

  if (!isConfigured) return null;

  return (
    <section className="mq-home-overview">
      <div className="container-custom">
        <div className="text-center mb-8">
          <span className="mq-kicker">INSTITUTIONAL ROLE</span>
          <h2 className="mq-title text-3xl md:text-4xl">{heroConfig.positioningTitle || 'Platform Overview'}</h2>
        </div>

        {heroConfig.subheading && (
          <p className="mq-copy max-w-4xl mx-auto text-center mb-12">
            {heroConfig.subheading}
          </p>
        )}

        {heroConfig.positioningParagraphs.length > 0 && (
          <div className="mq-panel p-6 mb-8">
            <div className="space-y-2">
              {heroConfig.positioningParagraphs.map((line, idx) => (
                <p key={idx} className="mq-copy text-base">{line}</p>
              ))}
            </div>
          </div>
        )}

        {heroConfig.coreCapabilities.length > 0 && (
          <div className="mb-6">
            {heroConfig.coreCapabilitiesTitle && (
              <h3 className="mq-title text-2xl md:text-3xl mb-5">{heroConfig.coreCapabilitiesTitle}</h3>
            )}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {heroConfig.coreCapabilities.map((item, idx) => (
                <article key={idx} className="mq-card">
                  <img
                    src={item.image || `/images/model-framework.jpg`}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                    loading="lazy"
                  />
                  <h4 className="font-sans text-slate-900 font-semibold mb-2">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
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

        {(heroConfig.geographicPlatformText || heroConfig.institutionalEngagementItems?.length || heroConfig.partnershipOpportunitiesText) && (
          <div className="grid lg:grid-cols-3 gap-4 mt-8">
            <article className="mq-card">
              <h3 className="mq-title text-2xl mb-4">{heroConfig.geographicPlatformTitle}</h3>
              <p className="mq-copy text-base mb-4">{heroConfig.geographicPlatformText}</p>
              <div className="space-y-2 text-sm text-slate-700">
                <p><span className="font-semibold text-slate-900">Headquarters:</span> Dubai, United Arab Emirates</p>
                <p><span className="font-semibold text-slate-900">Regional Operations:</span> East Africa</p>
                <p><span className="font-semibold text-slate-900">Coverage:</span> Including Ethiopia and Djibouti</p>
              </div>
            </article>

            <article className="mq-card">
              <h3 className="mq-title text-2xl mb-4">{heroConfig.institutionalEngagementTitle}</h3>
              <ul className="space-y-3">
                {heroConfig.institutionalEngagementItems?.map((item, idx) => (
                  <li key={`${item}-${idx}`} className="text-slate-700 text-sm leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="mq-card">
              <h3 className="mq-title text-2xl mb-4">{heroConfig.partnershipOpportunitiesTitle}</h3>
              <p className="mq-copy text-base">{heroConfig.partnershipOpportunitiesText}</p>
            </article>
          </div>
        )}

      </div>
    </section>
  );
}
