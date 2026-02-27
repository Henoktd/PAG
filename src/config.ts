// =============================================================================
// Pan Africa Group LLC - Website Configuration
// =============================================================================
// This file now loads content from JSON files managed by Decap CMS
// Content files are located in the /content folder
// =============================================================================

// Import content source (local JSON fallback + optional Sanity runtime data)
import { content, setContent, type SiteContent } from './lib/contentLoader';

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
    { name: "Home", href: "/", icon: "Home" },
    { name: "About PAG", href: "/about", icon: "BookOpen" },
    { name: "Activity Domains", href: "/activity-domains", icon: "Grape" },
    { name: "Operating Model", href: "/operating-model", icon: "Users" },
    { name: "Regional Presence", href: "/regional-presence", icon: "MapPin" },
    { name: "Contact", href: "/contact", icon: "Mail" },
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

export interface HeroCapability {
  title: string;
  description: string;
  image?: string;
}

export interface HeroConfig {
  scriptText: string;
  mainTitle: string;
  subheading: string;
  ctaButtonText: string;
  ctaTarget: string;
  stats: HeroStat[];
  decorativeText: string;
  backgroundImage: string;
  positioningTitle: string;
  positioningParagraphs: string[];
  coreCapabilitiesTitle: string;
  coreCapabilities: HeroCapability[];
  institutionalOrientationTitle: string;
  institutionalOrientationText: string;
}

export const heroConfig: HeroConfig = {
  scriptText: content.hero.scriptText,
  mainTitle: content.hero.mainTitle,
  subheading: content.hero.subheading,
  ctaButtonText: content.hero.ctaButtonText,
  ctaTarget: "/activity-domains",
  stats: content.hero.stats,
  decorativeText: content.hero.decorativeText,
  backgroundImage: content.hero.backgroundImage,
  positioningTitle: content.hero.positioningTitle,
  positioningParagraphs: content.hero.positioningParagraphs,
  coreCapabilitiesTitle: content.hero.coreCapabilitiesTitle,
  coreCapabilities: content.hero.coreCapabilities,
  institutionalOrientationTitle: content.hero.institutionalOrientationTitle,
  institutionalOrientationText: content.hero.institutionalOrientationText,
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

// -----------------------------------------------------------------------------
// Runtime Content Sync (used after loading Sanity data)
// -----------------------------------------------------------------------------
function syncConfigsFromContent() {
  heroConfig.scriptText = content.hero.scriptText;
  heroConfig.mainTitle = content.hero.mainTitle;
  heroConfig.subheading = content.hero.subheading;
  heroConfig.ctaButtonText = content.hero.ctaButtonText;
  heroConfig.stats = content.hero.stats;
  heroConfig.decorativeText = content.hero.decorativeText;
  heroConfig.backgroundImage = content.hero.backgroundImage;
  heroConfig.positioningTitle = content.hero.positioningTitle;
  heroConfig.positioningParagraphs = content.hero.positioningParagraphs;
  heroConfig.coreCapabilitiesTitle = content.hero.coreCapabilitiesTitle;
  heroConfig.coreCapabilities = content.hero.coreCapabilities;
  heroConfig.institutionalOrientationTitle = content.hero.institutionalOrientationTitle;
  heroConfig.institutionalOrientationText = content.hero.institutionalOrientationText;

  wineShowcaseConfig.scriptText = content.activities.scriptText;
  wineShowcaseConfig.subtitle = content.activities.subtitle;
  wineShowcaseConfig.mainTitle = content.activities.mainTitle;
  wineShowcaseConfig.wines = content.activities.wines;
  wineShowcaseConfig.features = content.activities.features;
  wineShowcaseConfig.quote = content.activities.quote;

  wineryCarouselConfig.scriptText = content.model.scriptText;
  wineryCarouselConfig.subtitle = content.model.subtitle;
  wineryCarouselConfig.mainTitle = content.model.mainTitle;
  wineryCarouselConfig.locationTag = content.model.locationTag;
  wineryCarouselConfig.slides = content.model.slides;

  museumConfig.scriptText = content.about.scriptText;
  museumConfig.subtitle = content.about.subtitle;
  museumConfig.mainTitle = content.about.mainTitle;
  museumConfig.introText = content.about.introText;
  museumConfig.timeline = content.about.timeline;
  museumConfig.tabs = content.about.tabs;
  museumConfig.openingHours = content.about.openingHours;
  museumConfig.openingHoursLabel = content.about.openingHoursLabel;
  museumConfig.ctaButtonText = content.about.ctaButtonText;
  museumConfig.yearBadge = content.about.yearBadge;
  museumConfig.yearBadgeLabel = content.about.yearBadgeLabel;
  museumConfig.quote = content.about.quote;
  museumConfig.founderPhotoAlt = content.about.founderPhotoAlt;
  museumConfig.founderPhoto = content.about.founderPhoto;

  newsConfig.scriptText = content.presence.scriptText;
  newsConfig.subtitle = content.presence.subtitle;
  newsConfig.mainTitle = content.presence.mainTitle;
  newsConfig.viewAllText = content.presence.viewAllText;
  newsConfig.readMoreText = content.presence.readMoreText;
  newsConfig.articles = content.presence.articles;
  newsConfig.testimonialsScriptText = content.partners.testimonialsScriptText;
  newsConfig.testimonialsSubtitle = content.partners.testimonialsSubtitle;
  newsConfig.testimonialsMainTitle = content.partners.testimonialsMainTitle;
  newsConfig.testimonials = content.partners.testimonials;
  newsConfig.storyScriptText = content.governance.scriptText;
  newsConfig.storySubtitle = content.governance.subtitle;
  newsConfig.storyTitle = content.governance.storyTitle;
  newsConfig.storyParagraphs = content.governance.storyParagraphs;
  newsConfig.storyTimeline = content.governance.storyTimeline;
  newsConfig.storyQuote = content.governance.storyQuote;
  newsConfig.storyImage = content.governance.storyImage;
  newsConfig.storyImageCaption = content.governance.storyImageCaption;

  contactFormConfig.scriptText = content.contact.scriptText;
  contactFormConfig.subtitle = content.contact.subtitle;
  contactFormConfig.mainTitle = content.contact.mainTitle;
  contactFormConfig.introText = content.contact.introText;
  contactFormConfig.contactInfoTitle = content.contact.contactInfoTitle;
  contactFormConfig.contactInfo = content.contact.contactInfo;
  contactFormConfig.form = content.contact.form;
  contactFormConfig.privacyNotice = content.contact.privacyNotice;
  contactFormConfig.formEndpoint = content.contact.formEndpoint;

  footerConfig.brandName = content.footer.brandName;
  footerConfig.tagline = content.footer.tagline;
  footerConfig.description = content.footer.description;
  footerConfig.socialLinks = content.footer.socialLinks;
  footerConfig.linkGroups = content.footer.linkGroups;
  footerConfig.contactItems = content.footer.contactItems;
  footerConfig.newsletterLabel = content.footer.newsletterLabel;
  footerConfig.newsletterPlaceholder = content.footer.newsletterPlaceholder;
  footerConfig.newsletterButtonText = content.footer.newsletterButtonText;
  footerConfig.newsletterSuccessText = content.footer.newsletterSuccessText;
  footerConfig.newsletterErrorText = content.footer.newsletterErrorText;
  footerConfig.newsletterEndpoint = content.footer.newsletterEndpoint;
  footerConfig.copyrightText = content.footer.copyrightText;
  footerConfig.legalLinks = content.footer.legalLinks;
  footerConfig.icpText = content.footer.icpText;
  footerConfig.backToTopText = content.footer.backToTopText;
  footerConfig.ageVerificationText = content.footer.ageVerificationText;
}

export function applyContent(nextContent: Partial<SiteContent>) {
  setContent(nextContent);
  syncConfigsFromContent();
}
