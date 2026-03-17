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
      'Financial infrastructure enables economic participation and strengthens institutional financial systems. PAG focuses on platforms that expand access while preserving security, reliability, and institutional oversight.',
    implementationTitle: 'How PAG typically supports this area',
    implementationPoints: [
      'Structures collaboration between technology providers, distributors, and institutional stakeholders.',
      'Aligns deployment requirements across payment workflows, distribution channels, and operating controls.',
      'Supports rollout planning for secure and scalable financial access infrastructure.',
    ],
    outcomesTitle: 'Typical program outcomes',
    outcomes: [
      'Expanded access to secure digital financial services',
      'More resilient distribution and payment channels',
      'Operational readiness for regulated financial platforms',
    ],
  },
  'security-identity': {
    overviewTitle: 'Why this area matters',
    overview:
      'Modern institutional systems rely on secure identity platforms that enable reliable verification and access control. PAG supports deployments where technical capability must align with governance, compliance, and operating continuity.',
    implementationTitle: 'How PAG typically supports this area',
    implementationPoints: [
      'Coordinates between public institutions, specialist vendors, and implementation partners.',
      'Supports planning around authentication integrity, secure verification, and deployment sequencing.',
      'Helps align regulatory requirements with institutional operating conditions.',
    ],
    outcomesTitle: 'Typical program outcomes',
    outcomes: [
      'Stronger institutional trust and verification capability',
      'Clearer governance and accountability structures',
      'Improved continuity for sensitive digital systems',
    ],
  },
  'smart-mobility': {
    overviewTitle: 'Why this area matters',
    overview:
      'Urban development increasingly relies on intelligent mobility platforms that improve transportation efficiency and accessibility. PAG supports controlled deployments built for institutional use and long-term operating viability.',
    implementationTitle: 'How PAG typically supports this area',
    implementationPoints: [
      'Coordinates stakeholders across platform providers, regulators, operators, and deployment partners.',
      'Supports readiness planning for vehicles, drone systems, and supporting mobility infrastructure.',
      'Helps define deployment scope, operating controls, and scaling pathways.',
    ],
    outcomesTitle: 'Typical program outcomes',
    outcomes: [
      'More structured pilot-to-scale progression',
      'Reduced deployment friction across stakeholders',
      'Stronger alignment between mobility regulation and operations',
    ],
  },
  'procurement-supply': {
    overviewTitle: 'Why this area matters',
    overview:
      'Governments across emerging markets are implementing digital platforms to improve public services and administrative efficiency. PAG supports government digital systems where security, continuity, and institutional performance are essential.',
    implementationTitle: 'How PAG typically supports this area',
    implementationPoints: [
      'Coordinates system planning across public institutions, solution providers, and implementation partners.',
      'Supports deployment readiness for secure platforms, institutional data systems, and digital public service environments.',
      'Helps align operational requirements, compliance expectations, and continuity planning.',
    ],
    outcomesTitle: 'Typical program outcomes',
    outcomes: [
      'Improved digital public service capability',
      'Stronger institutional data and system environments',
      'Better alignment between government operations and digital infrastructure',
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
