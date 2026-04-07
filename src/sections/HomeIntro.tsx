import { ArrowRight } from 'lucide-react';
import { heroConfig } from '../config';

const quickThemes = [
  { label: 'Digital Government Platforms', href: '/areas-of-operation/procurement-supply' },
  { label: 'Financial Access Infrastructure', href: '/areas-of-operation/financial-access' },
  { label: 'Smart Mobility Systems', href: '/areas-of-operation/smart-mobility' },
  { label: 'Secure Technology Environments', href: '/areas-of-operation/security-identity' },
  { label: 'Supply Chain Enablement', href: '/areas-of-operation/supply-chain' },
];

export function HomeIntro() {
  if (!heroConfig.positioningParagraphs.length) return null;

  const goTo = (href: string) => {
    const current = window.location.pathname.replace(/\/+$/, '') || '/';
    const target = href.replace(/\/+$/, '') || '/';
    if (current !== target) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section className="mq-inner-section pt-8 md:pt-10 lg:pt-12 pb-8 md:pb-10">
      <div className="container-custom">
        <div className="mq-panel bg-white/95 border border-slate-200 p-6 md:p-8 lg:p-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div>
              <span className="mq-kicker">PAG Is</span>
              <p className="mq-copy text-lg md:text-xl text-slate-700 max-w-4xl">
                {heroConfig.positioningParagraphs[0]} {heroConfig.positioningParagraphs[1]}
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-[#eef2ff] to-[#fff7ef] border border-[#38469D]/10 p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-gold-700 mb-4">Institutional Focus Areas</p>
              <div className="flex flex-wrap gap-2.5">
                {quickThemes.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => goTo(item.href)}
                    className="inline-flex items-center rounded-full border border-[#38469D]/12 bg-white px-3 py-2 text-xs md:text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-[#38469D]/35 hover:text-[#38469D] hover:-translate-y-0.5"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => goTo('/areas-of-operation')}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#38469D] hover:text-[#F39D4C] transition-colors"
              >
                Reliability, compliance, and continuity
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
