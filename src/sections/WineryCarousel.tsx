import { wineryCarouselConfig } from '../config';

export function WineryCarousel() {
  if (!wineryCarouselConfig.mainTitle || wineryCarouselConfig.slides.length === 0) return null;

  return (
    <section id="model" className="mq-section mq-inner-section bg-slate-50 border-y border-slate-200">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="mq-kicker">
            {wineryCarouselConfig.subtitle}
          </span>
          <h2 className="mq-title mb-3">{wineryCarouselConfig.mainTitle}</h2>
          <p className="mq-copy">{wineryCarouselConfig.locationTag}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {wineryCarouselConfig.slides.map((slide) => (
            <article key={slide.area} className="mq-card p-5">
              {slide.image && (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-28 object-cover rounded-md mb-3"
                  loading="lazy"
                />
              )}
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
