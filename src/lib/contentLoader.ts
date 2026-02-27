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

export const defaultContent = {
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

export type SiteContent = typeof defaultContent;

// Mutable content source used by the website configuration.
// Starts from local JSON and can be replaced/augmented by Sanity at runtime.
export let content: SiteContent = { ...defaultContent };

export function setContent(nextContent: Partial<SiteContent>) {
  const mergeSection = <K extends keyof SiteContent>(key: K): SiteContent[K] => ({
    ...defaultContent[key],
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
