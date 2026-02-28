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

        <div className="max-w-5xl mx-auto">
          {wineryCarouselConfig.slides.map((slide, index) => (
            <article key={slide.area || `${slide.title}-${index}`} className="relative pl-16 pb-8 last:pb-0">
              {index < wineryCarouselConfig.slides.length - 1 && (
                <span
                  className="absolute left-7 top-12 bottom-0 w-px bg-slate-300"
                  aria-hidden="true"
                />
              )}

              <div className="absolute left-3 top-4 h-7 w-7 rounded-full bg-[#38469D] border-4 border-white shadow-sm" aria-hidden="true">
              </div>

              <div className="mq-card p-5 md:p-6">
                <div className="grid md:grid-cols-[220px_1fr] gap-5 md:gap-6 items-start">
                  {slide.image && (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-36 md:h-32 object-cover rounded-md"
                      loading="lazy"
                    />
                  )}

                  <div>
                    <h3 className="font-sans text-lg md:text-xl font-semibold text-slate-900 mb-2">{slide.title}</h3>
                    <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed">{slide.description}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
