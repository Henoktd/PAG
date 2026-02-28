// Import all local fallback JSON files
import homeContent from '../../content/home/home.json';
import aboutContent from '../../content/about/about.json';
import activitiesContent from '../../content/activities/activities.json';
import modelContent from '../../content/model/operating-model.json';
import presenceContent from '../../content/presence/regional-presence.json';
import partnersContent from '../../content/partners/partners.json';
import governanceContent from '../../content/governance/governance.json';
import contactContent from '../../content/contact/contact.json';
import footerContent from '../../content/footer/footer.json';
import arHomeContent from '../../content/i18n/ar/home/home.json';
import arAboutContent from '../../content/i18n/ar/about/about.json';
import arActivitiesContent from '../../content/i18n/ar/activities/activities.json';
import arModelContent from '../../content/i18n/ar/model/operating-model.json';
import arPresenceContent from '../../content/i18n/ar/presence/regional-presence.json';
import arPartnersContent from '../../content/i18n/ar/partners/partners.json';
import arGovernanceContent from '../../content/i18n/ar/governance/governance.json';
import arContactContent from '../../content/i18n/ar/contact/contact.json';
import arFooterContent from '../../content/i18n/ar/footer/footer.json';
import type { LanguageCode } from './i18n';

const englishContent = {
  hero: homeContent,
  about: aboutContent,
  activities: activitiesContent,
  model: modelContent,
  presence: presenceContent,
  partners: partnersContent,
  governance: governanceContent,
  contact: contactContent,
  footer: footerContent,
};

const arabicContent = {
  hero: arHomeContent,
  about: arAboutContent,
  activities: arActivitiesContent,
  model: arModelContent,
  presence: arPresenceContent,
  partners: arPartnersContent,
  governance: arGovernanceContent,
  contact: arContactContent,
  footer: arFooterContent,
};

const contentByLanguage = {
  en: englishContent,
  ar: arabicContent,
};

export type SiteContent = typeof englishContent;

let baseContent: SiteContent = contentByLanguage.en;
let activeLanguage: LanguageCode = 'en';

// Mutable content source used by the website configuration.
// Starts from local JSON and can be replaced/augmented by Sanity at runtime.
export let content: SiteContent = { ...baseContent };

export function getActiveLanguage() {
  return activeLanguage;
}

export function setActiveLanguage(language: LanguageCode) {
  activeLanguage = language;
  baseContent = contentByLanguage[language];
  content = { ...baseContent };
}

export function setContent(nextContent: Partial<SiteContent>) {
  const mergeSection = <K extends keyof SiteContent>(key: K): SiteContent[K] => ({
    ...baseContent[key],
    ...(nextContent[key] ?? {}),
  });

  content = {
    hero: mergeSection('hero'),
    about: mergeSection('about'),
    activities: mergeSection('activities'),
    model: mergeSection('model'),
    presence: mergeSection('presence'),
    partners: mergeSection('partners'),
    governance: mergeSection('governance'),
    contact: mergeSection('contact'),
    footer: mergeSection('footer'),
  };
}
