import { ArrowUp, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { footerConfig } from '../config';

export function Footer() {
  if (!footerConfig.brandName) return null;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Mail, Phone, MapPin,
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/brand/pag-logo-horizontal.png" alt="PAG logo" className="h-9 w-auto object-contain" />
              <span className="font-sans font-semibold text-slate-900 text-lg">{footerConfig.brandName}</span>
            </div>
            <p className="text-slate-600 text-sm mb-5 max-w-md">{footerConfig.description}</p>
            <p className="text-xs text-gold-700 uppercase tracking-[0.14em]">{footerConfig.tagline}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {footerConfig.linkGroups.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-semibold text-slate-900 mb-3">{group.title}</p>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-sm text-slate-600 hover:text-gold-700 transition-colors"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 mb-3">Contact</p>
            <div className="space-y-2">
              {footerConfig.contactItems.map((item, idx) => {
                const Icon = iconMap[item.icon];
                return (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    {Icon && <Icon className="w-4 h-4 text-gold-700 mt-0.5" />}
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 mt-5">
              {footerConfig.socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-gold-600 hover:text-gold-700">
                  <Linkedin className="w-4 h-4" />
                </a>
              ))}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-gold-600 hover:text-gold-700"
                aria-label={footerConfig.backToTopText}
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-xs text-slate-500">{footerConfig.copyrightText}</p>
          <p className="text-xs text-slate-500">{footerConfig.icpText}</p>
        </div>
      </div>
    </footer>
  );
}
