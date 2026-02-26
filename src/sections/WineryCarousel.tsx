import { wineryCarouselConfig } from '../config';

export function WineryCarousel() {
  if (!wineryCarouselConfig.mainTitle || wineryCarouselConfig.slides.length === 0) return null;

  return (
    <section id="model" className="section-padding bg-slate-50 border-y border-slate-200">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="font-sans text-sm text-gold-700 uppercase tracking-[0.2em] mb-3 block">
            {wineryCarouselConfig.subtitle}
          </span>
          <h2 className="font-sans text-h2 text-slate-900 mb-3">{wineryCarouselConfig.mainTitle}</h2>
          <p className="text-slate-600">{wineryCarouselConfig.locationTag}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {wineryCarouselConfig.slides.map((slide) => (
            <article key={slide.area} className="bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-gold-700 text-xs uppercase tracking-[0.15em] mb-2">Step {slide.area}</p>
              <h3 className="font-sans text-lg font-semibold text-slate-900 mb-2">{slide.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{slide.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
