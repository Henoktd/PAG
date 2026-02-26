// Content Loader Utility
// Loads content from JSON files for CMS integration

// Import all content JSON files
import heroContent from '../../content/hero/hero.json';
import aboutContent from '../../content/about/about.json';
import activitiesContent from '../../content/activities/activities.json';
import modelContent from '../../content/model/operating-model.json';
import presenceContent from '../../content/presence/regional-presence.json';
import partnersContent from '../../content/partners/partners.json';
import governanceContent from '../../content/governance/governance.json';
import contactContent from '../../content/contact/contact.json';
import footerContent from '../../content/footer/footer.json';

// Export loaded content
export const content = {
  hero: heroContent,
  about: aboutContent,
  activities: activitiesContent,
  model: modelContent,
  presence: presenceContent,
  partners: partnersContent,
  governance: governanceContent,
  contact: contactContent,
  footer: footerContent,
};

// Type definitions for content
export type HeroContent = typeof heroContent;
export type AboutContent = typeof aboutContent;
export type ActivitiesContent = typeof activitiesContent;
export type ModelContent = typeof modelContent;
export type PresenceContent = typeof presenceContent;
export type PartnersContent = typeof partnersContent;
export type GovernanceContent = typeof governanceContent;
export type ContactContent = typeof contactContent;
export type FooterContent = typeof footerContent;

// Helper function to get content by key
export function getContent<T>(key: keyof typeof content): T {
  return content[key] as T;
}

// Function to merge content with defaults
export function mergeWithDefaults<T>(loadedContent: Partial<T>, defaults: T): T {
  return { ...defaults, ...loadedContent };
}
