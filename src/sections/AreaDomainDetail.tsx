import { activityDomainsConfig } from '../config';

const domainContext: Record<string, {
  overviewTitle: string;
  overview: string;
  implementationTitle: string;
  implementationPoints: string[];
  outcomesTitle: string;
  outcomes: string[];
}> = {
  'financial-access': {
    overviewTitle: 'Why this area matters',
    overview:
      'Digital financial access programs succeed when distribution infrastructure, compliance controls, and partner coordination are designed together. PAG focuses on platforms that help institutions expand reach without compromising reliability or oversight.',
    implementationTitle: 'How PAG typically supports this area',
    implementationPoints: [
      'Structures partner models between technology providers, distributors, and institutional stakeholders.',
      'Aligns rollout requirements across payment workflows, channel operations, and control environments.',
      'Supports supply and deployment coordination for secure field-ready infrastructure.',
    ],
    outcomesTitle: 'Typical program outcomes',
    outcomes: [
      'Broader and more resilient access channels',
      'Better control over regulated product distribution',
      'Operational readiness for multi-market scale',
    ],
  },
  'security-identity': {
    overviewTitle: 'Why this area matters',
    overview:
      'Security, identity, and government systems require trust, continuity, and strict operating discipline. PAG supports initiatives where technical capability must be matched by governance, procurement reliability, and implementation coordination.',
    implementationTitle: 'How PAG typically supports this area',
    implementationPoints: [
      'Coordinates between public institutions, specialist vendors, and implementation partners.',
      'Supports planning around compliance, authentication integrity, and deployment sequencing.',
      'Helps align sourcing, delivery, and institutional operating requirements.',
    ],
    outcomesTitle: 'Typical program outcomes',
    outcomes: [
      'Higher-confidence deployment environments',
      'Clearer governance and accountability structures',
      'Improved continuity for mission-critical systems',
    ],
  },
  'smart-mobility': {
    overviewTitle: 'Why this area matters',
    overview:
      'Mobility and autonomous platforms only work when technology, regulation, field operations, and maintenance planning are considered as one system. PAG supports controlled deployments built for institutional use and long-term operating viability.',
    implementationTitle: 'How PAG typically supports this area',
    implementationPoints: [
      'Coordinates stakeholders across platform providers, regulators, operators, and deployment partners.',
      'Supports sourcing and readiness planning for vehicles, drone systems, and fleet infrastructure.',
      'Helps define deployment scope, operating controls, and scaling pathways.',
    ],
    outcomesTitle: 'Typical program outcomes',
    outcomes: [
      'More structured pilot-to-scale progression',
      'Reduced deployment friction across stakeholders',
      'Stronger alignment between regulation and operations',
    ],
  },
  'procurement-supply': {
    overviewTitle: 'Why this area matters',
    overview:
      'Complex programs often fail because the commercial and logistics backbone is weak. PAG approaches procurement and supply coordination as an operational discipline that supports regulated infrastructure and technology deployment at scale.',
    implementationTitle: 'How PAG typically supports this area',
    implementationPoints: [
      'Coordinates supplier engagement, sourcing pathways, and delivery dependencies across borders.',
      'Supports procurement planning for specialized or regulated equipment.',
      'Helps align logistics, documentation, and implementation schedules with project requirements.',
    ],
    outcomesTitle: 'Typical program outcomes',
    outcomes: [
      'Better supply reliability for critical deployments',
      'Clearer coordination between commercial and field execution teams',
      'Lower operational disruption from sourcing bottlenecks',
    ],
  },
};

export function AreaDomainDetail({ slug }: { slug: string }) {
  const domain = activityDomainsConfig.domains.find((entry) => entry.id === slug);
  if (!domain) return null;
  const context = domainContext[domain.id] ?? {
    overviewTitle: 'Why this area matters',
    overview: domain.detail,
    implementationTitle: 'How PAG typically supports this area',
    implementationPoints: domain.focusAreas.slice(0, 3),
    outcomesTitle: 'Typical program outcomes',
    outcomes: domain.focusAreas.slice(0, 3),
  };

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
          <p className="mq-copy mb-3">{domain.description}</p>
          <p className="text-slate-700 text-base leading-relaxed mb-8">{domain.detail}</p>

          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div className="mq-card">
              <p className="mq-kicker !mb-2">{context.overviewTitle}</p>
              <p className="mq-copy text-base">{context.overview}</p>
            </div>

            <div className="mq-card">
              <p className="mq-kicker !mb-2">{context.outcomesTitle}</p>
              <ul className="space-y-3">
                {context.outcomes.map((outcome) => (
                  <li key={outcome} className="text-slate-700 text-sm leading-relaxed">
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="mq-card">
              <h2 className="font-sans text-xl font-semibold text-slate-900 mb-3">Focus Areas</h2>
              <ul className="space-y-2">
                {domain.focusAreas.map((focus) => (
                  <li key={focus} className="text-slate-700 text-sm leading-relaxed">
                    {focus}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mq-card">
              <p className="mq-kicker !mb-2">{context.implementationTitle}</p>
              <ul className="space-y-3">
                {context.implementationPoints.map((point) => (
                  <li key={point} className="text-slate-700 text-sm leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
