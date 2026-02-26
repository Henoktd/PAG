// =============================================================================
// Pan Africa Group LLC - Website Configuration
// =============================================================================
// This file now loads content from JSON files managed by Decap CMS
// Content files are located in the /content folder
// =============================================================================

// Import content from JSON files (loaded via contentLoader)
import { content } from './lib/contentLoader';

// -----------------------------------------------------------------------------
// Site Config
// -----------------------------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  keywords: string;
  ogImage: string;
  canonical: string;
}

export const siteConfig: SiteConfig = {
  title: "Pan Africa Group LLC | Cross-Border Business Development Platform",
  description: "Pan Africa Group LLC (PAG) is a Dubai-based cross-border business development and market enablement platform connecting Gulf and East Africa markets.",
  language: "en",
  keywords: "Pan Africa Group, PAG, cross-border structuring, institutional sourcing, contract architecture, UAE, Djibouti, East Africa corridor",
  ogImage: "/images/og-image.jpg",
  canonical: "https://panafricagroup.com",
};

// -----------------------------------------------------------------------------
// Navigation Config
// -----------------------------------------------------------------------------
export interface NavDropdownItem {
  name: string;
  href: string;
}

export interface NavLink {
  name: string;
  href: string;
  icon: string;
  dropdown?: NavDropdownItem[];
}

export interface NavigationConfig {
  brandName: string;
  brandSubname: string;
  tagline: string;
  navLinks: NavLink[];
  ctaButtonText: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "Pan Africa Group",
  brandSubname: "LLC",
  tagline: "Cross-Border Business Development",
  navLinks: [
    { name: "Home", href: "#home", icon: "Home" },
    { name: "About PAG", href: "#about", icon: "BookOpen" },
    { name: "Activity Domains", href: "#activities", icon: "Grape" },
    { name: "Operating Model", href: "#model", icon: "Users" },
    { name: "Regional Presence", href: "#presence", icon: "MapPin" },
    { name: "Contact", href: "#contact", icon: "Mail" },
  ],
  ctaButtonText: "",
};

// -----------------------------------------------------------------------------
// Preloader Config
// -----------------------------------------------------------------------------
export interface PreloaderConfig {
  brandName: string;
  brandSubname: string;
  yearText: string;
}

export const preloaderConfig: PreloaderConfig = {
  brandName: "Pan Africa Group",
  brandSubname: "Institutional Platform",
  yearText: "A Solstice Ventures Holding Company",
};

// -----------------------------------------------------------------------------
// Hero Config (Loaded from CMS)
// -----------------------------------------------------------------------------
export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HeroConfig {
  scriptText: string;
  mainTitle: string;
  ctaButtonText: string;
  ctaTarget: string;
  stats: HeroStat[];
  decorativeText: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  scriptText: content.hero.scriptText,
  mainTitle: content.hero.mainTitle,
  ctaButtonText: content.hero.ctaButtonText,
  ctaTarget: "#activities",
  stats: content.hero.stats,
  decorativeText: content.hero.decorativeText,
  backgroundImage: content.hero.backgroundImage,
};

// -----------------------------------------------------------------------------
// Wine Showcase Config (repurposed for Activity Domains - Loaded from CMS)
// -----------------------------------------------------------------------------
export interface Wine {
  id: string;
  name: string;
  subtitle: string;
  year: string;
  image: string;
  filter: string;
  glowColor: string;
  description: string;
  tastingNotes: string;
  alcohol: string;
  temperature: string;
  aging: string;
}

export interface WineFeature {
  icon: string;
  title: string;
  description: string;
}

export interface WineQuote {
  text: string;
  attribution: string;
  prefix: string;
}

export interface WineShowcaseConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  wines: Wine[];
  features: WineFeature[];
  quote: WineQuote;
}

export const wineShowcaseConfig: WineShowcaseConfig = {
  scriptText: content.activities.scriptText,
  subtitle: content.activities.subtitle,
  mainTitle: content.activities.mainTitle,
  wines: content.activities.wines,
  features: content.activities.features,
  quote: content.activities.quote,
};

// -----------------------------------------------------------------------------
// Winery Carousel Config (repurposed for Operating Model - Loaded from CMS)
// -----------------------------------------------------------------------------
export interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
  area: string;
  unit: string;
  description: string;
}

export interface WineryCarouselConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  locationTag: string;
  slides: CarouselSlide[];
}

export const wineryCarouselConfig: WineryCarouselConfig = {
  scriptText: content.model.scriptText,
  subtitle: content.model.subtitle,
  mainTitle: content.model.mainTitle,
  locationTag: content.model.locationTag,
  slides: content.model.slides,
};

// -----------------------------------------------------------------------------
// Museum Config (repurposed for About PAG - Loaded from CMS)
// -----------------------------------------------------------------------------
export interface TimelineEvent {
  year: string;
  event: string;
}

export interface MuseumTabContent {
  title: string;
  description: string;
  highlight: string;
}

export interface MuseumTab {
  id: string;
  name: string;
  icon: string;
  image: string;
  content: MuseumTabContent;
}

export interface MuseumQuote {
  prefix: string;
  text: string;
  attribution: string;
}

export interface MuseumConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  timeline: TimelineEvent[];
  tabs: MuseumTab[];
  openingHours: string;
  openingHoursLabel: string;
  ctaButtonText: string;
  yearBadge: string;
  yearBadgeLabel: string;
  quote: MuseumQuote;
  founderPhotoAlt: string;
  founderPhoto: string;
}

export const museumConfig: MuseumConfig = {
  scriptText: content.about.scriptText,
  subtitle: content.about.subtitle,
  mainTitle: content.about.mainTitle,
  introText: content.about.introText,
  timeline: content.about.timeline,
  tabs: content.about.tabs,
  openingHours: content.about.openingHours,
  openingHoursLabel: content.about.openingHoursLabel,
  ctaButtonText: content.about.ctaButtonText,
  yearBadge: content.about.yearBadge,
  yearBadgeLabel: content.about.yearBadgeLabel,
  quote: content.about.quote,
  founderPhotoAlt: content.about.founderPhotoAlt,
  founderPhoto: content.about.founderPhoto,
};

// -----------------------------------------------------------------------------
// News Config (repurposed for Regional Presence & Partners - Loaded from CMS)
// -----------------------------------------------------------------------------
export interface NewsArticle {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface StoryQuote {
  prefix: string;
  text: string;
  attribution: string;
}

export interface StoryTimelineItem {
  value: string;
  label: string;
}

export interface NewsConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  viewAllText: string;
  readMoreText: string;
  articles: NewsArticle[];
  testimonialsScriptText: string;
  testimonialsSubtitle: string;
  testimonialsMainTitle: string;
  testimonials: Testimonial[];
  storyScriptText: string;
  storySubtitle: string;
  storyTitle: string;
  storyParagraphs: string[];
  storyTimeline: StoryTimelineItem[];
  storyQuote: StoryQuote;
  storyImage: string;
  storyImageCaption: string;
}

export const newsConfig: NewsConfig = {
  scriptText: content.presence.scriptText,
  subtitle: content.presence.subtitle,
  mainTitle: content.presence.mainTitle,
  viewAllText: content.presence.viewAllText,
  readMoreText: content.presence.readMoreText,
  articles: content.presence.articles,
  testimonialsScriptText: content.partners.testimonialsScriptText,
  testimonialsSubtitle: content.partners.testimonialsSubtitle,
  testimonialsMainTitle: content.partners.testimonialsMainTitle,
  testimonials: content.partners.testimonials,
  storyScriptText: content.governance.scriptText,
  storySubtitle: content.governance.subtitle,
  storyTitle: content.governance.storyTitle,
  storyParagraphs: content.governance.storyParagraphs,
  storyTimeline: content.governance.storyTimeline,
  storyQuote: content.governance.storyQuote,
  storyImage: content.governance.storyImage,
  storyImageCaption: content.governance.storyImageCaption,
};

// -----------------------------------------------------------------------------
// Contact Form Config (Loaded from CMS)
// -----------------------------------------------------------------------------
export interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  subtext: string;
}

export interface ContactFormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  visitDateLabel: string;
  visitorsLabel: string;
  visitorsOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  submitText: string;
  submittingText: string;
  successMessage: string;
  errorMessage: string;
}

export interface ContactFormConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  contactInfoTitle: string;
  contactInfo: ContactInfoItem[];
  form: ContactFormFields;
  privacyNotice: string;
  formEndpoint: string;
}

export const contactFormConfig: ContactFormConfig = {
  scriptText: content.contact.scriptText,
  subtitle: content.contact.subtitle,
  mainTitle: content.contact.mainTitle,
  introText: content.contact.introText,
  contactInfoTitle: content.contact.contactInfoTitle,
  contactInfo: content.contact.contactInfo,
  form: content.contact.form,
  privacyNotice: content.contact.privacyNotice,
  formEndpoint: content.contact.formEndpoint,
};

// -----------------------------------------------------------------------------
// Footer Config (Loaded from CMS)
// -----------------------------------------------------------------------------
export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterContactItem {
  icon: string;
  text: string;
}

export interface FooterConfig {
  brandName: string;
  tagline: string;
  description: string;
  socialLinks: SocialLink[];
  linkGroups: FooterLinkGroup[];
  contactItems: FooterContactItem[];
  newsletterLabel: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  newsletterErrorText: string;
  newsletterEndpoint: string;
  copyrightText: string;
  legalLinks: string[];
  icpText: string;
  backToTopText: string;
  ageVerificationText: string;
}

export const footerConfig: FooterConfig = {
  brandName: content.footer.brandName,
  tagline: content.footer.tagline,
  description: content.footer.description,
  socialLinks: content.footer.socialLinks,
  linkGroups: content.footer.linkGroups,
  contactItems: content.footer.contactItems,
  newsletterLabel: content.footer.newsletterLabel,
  newsletterPlaceholder: content.footer.newsletterPlaceholder,
  newsletterButtonText: content.footer.newsletterButtonText,
  newsletterSuccessText: content.footer.newsletterSuccessText,
  newsletterErrorText: content.footer.newsletterErrorText,
  newsletterEndpoint: content.footer.newsletterEndpoint,
  copyrightText: content.footer.copyrightText,
  legalLinks: content.footer.legalLinks,
  icpText: content.footer.icpText,
  backToTopText: content.footer.backToTopText,
  ageVerificationText: content.footer.ageVerificationText,
};

// -----------------------------------------------------------------------------
// Scroll To Top Config
// -----------------------------------------------------------------------------
export interface ScrollToTopConfig {
  ariaLabel: string;
}

export const scrollToTopConfig: ScrollToTopConfig = {
  ariaLabel: "Back to top",
};
