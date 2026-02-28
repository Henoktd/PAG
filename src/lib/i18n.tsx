import { createContext, useContext } from 'react';

export type LanguageCode = 'en' | 'ar';

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (next: LanguageCode) => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageContext.Provider');
  }
  return context;
}

const navLabels: Record<LanguageCode, Record<string, string>> = {
  en: {
    '/': 'Home',
    '/about': 'About PAG',
    '/activity-domains': 'Activity Domains',
    '/operating-model': 'Operating Model',
    '/regional-presence': 'Regional Presence',
    '/contact': 'Contact',
  },
  ar: {
    '/': 'الرئيسية',
    '/about': 'عن PAG',
    '/activity-domains': 'مجالات النشاط',
    '/operating-model': 'نموذج التشغيل',
    '/regional-presence': 'الحضور الإقليمي',
    '/contact': 'اتصل بنا',
  },
};

const labels: Record<LanguageCode, Record<string, string>> = {
  en: {
    language: 'Language',
    corridorPulse: 'Corridor Pulse',
    liveFlow: 'Live Gulf-East Africa Flow',
    flowCopy: 'Snapshot of corridor architecture from UAE coordination to East Africa execution lanes.',
    node: 'Node',
    exploreDomains: 'Explore Activity Domains',
    startInquiry: 'Start Institutional Inquiry',
    mandateFeed: 'Mandate Feed',
    structuringSignals: 'Current Structuring Signals',
    corridorVisualAlt: 'PAG corridor visual',
    activityIntro: 'Core mandate categories supporting Gulf-East Africa institutional engagements.',
    corridorMapKicker: 'Corridor Coverage Map',
    operatingAreas: 'Gulf-East Africa Operating Areas',
    contactCta: 'Institutional Contact',
    presenceIntro: 'Geographic footprint and institutional interface across core jurisdictions.',
    trustedNetworks: 'Trusted Across Partner Networks',
    mandateType: 'Mandate Type',
    footerContact: 'Contact',
  },
  ar: {
    language: 'اللغة',
    corridorPulse: 'نبض الممر',
    liveFlow: 'تدفق الخليج - شرق أفريقيا',
    flowCopy: 'عرض موجز لبنية الممر من التنسيق في الإمارات إلى مسارات التنفيذ في شرق أفريقيا.',
    node: 'نقطة',
    exploreDomains: 'استعراض مجالات النشاط',
    startInquiry: 'بدء استفسار مؤسسي',
    mandateFeed: 'موجز التفويضات',
    structuringSignals: 'مؤشرات الهيكلة الحالية',
    corridorVisualAlt: 'صورة ممر PAG',
    activityIntro: 'فئات التفويض الأساسية لدعم الارتباطات المؤسسية بين الخليج وشرق أفريقيا.',
    corridorMapKicker: 'خريطة تغطية الممر',
    operatingAreas: 'مناطق العمل في الخليج وشرق أفريقيا',
    contactCta: 'تواصل مؤسسي',
    presenceIntro: 'نطاق جغرافي وواجهة مؤسسية عبر الولايات الأساسية.',
    trustedNetworks: 'ثقة عبر شبكات الشركاء',
    mandateType: 'نوع التفويض',
    footerContact: 'التواصل',
  },
};

export function t(language: LanguageCode, key: string) {
  return labels[language][key] ?? labels.en[key] ?? key;
}

export function getNavLabel(language: LanguageCode, href: string, fallback: string) {
  return navLabels[language][href] ?? fallback;
}
