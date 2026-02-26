import { museumConfig } from '../config';

export function Museum() {
  if (!museumConfig.mainTitle) return null;

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <span className="font-sans text-sm text-gold-700 uppercase tracking-[0.2em] mb-3 block">
              {museumConfig.subtitle}
            </span>
            <h2 className="font-sans text-h2 text-slate-900 mb-5">{museumConfig.mainTitle}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{museumConfig.introText}</p>

            <div className="space-y-4">
              {museumConfig.tabs.slice(0, 3).map((tab) => (
                <div key={tab.id} className="bg-white border border-slate-200 rounded-lg p-5">
                  <h3 className="font-sans text-lg font-semibold text-slate-900 mb-2">{tab.content.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{tab.content.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <p className="text-sm text-gold-700 uppercase tracking-[0.15em] mb-4">At A Glance</p>
            <div className="space-y-3">
              {museumConfig.timeline.slice(0, 4).map((event) => (
                <div key={event.year} className="flex items-start gap-3">
                  <span className="font-sans font-semibold text-slate-900 min-w-[56px]">{event.year}</span>
                  <span className="text-slate-600 text-sm">{event.event}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200">
              <p className="text-slate-700 text-sm italic">"{museumConfig.quote.text}"</p>
              <p className="text-gold-700 text-xs mt-2">— {museumConfig.quote.attribution}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
