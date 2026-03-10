import { activityDomainsConfig } from '../config';

export function AreaDomainDetail({ slug }: { slug: string }) {
  const domain = activityDomainsConfig.domains.find((entry) => entry.id === slug);
  if (!domain) return null;

  const goTo = (href: string) => {
    const current = window.location.pathname.replace(/\/+$/, '') || '/';
    const target = href.replace(/\/+$/, '') || '/';
    if (current !== target) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section className="mq-section mq-inner-section">
      <div className="container-custom max-w-4xl">
        <button
          onClick={() => goTo('/areas-of-operation')}
          className="text-sm font-semibold text-[#38469D] hover:text-[#F39D4C] transition-colors mb-6"
        >
          Back to Areas of Operation
        </button>

        <div className="mq-panel p-6 md:p-8">
          <img
            src={domain.image}
            alt={domain.name}
            className="w-full h-64 md:h-80 object-cover rounded-md mb-6"
          />
          {domain.id === 'smart-mobility' && (
            <img
              src="/images/drone-platform.jpg"
              alt="Drone mobility platform"
              className="w-full h-56 md:h-72 object-cover rounded-md mb-6"
            />
          )}
          <h1 className="mq-title text-3xl md:text-4xl mb-4">{domain.name}</h1>
          <p className="mq-copy mb-4">{domain.description}</p>
          <p className="mq-copy text-base mb-6">{domain.detail}</p>

          <h2 className="font-sans text-xl font-semibold text-slate-900 mb-3">Focus Areas</h2>
          <ul className="space-y-2">
            {domain.focusAreas.map((focus) => (
              <li key={focus} className="text-slate-700 text-sm leading-relaxed">
                - {focus}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
