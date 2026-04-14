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
    '/capabilities': 'Capabilities',
    '/areas-of-operation': 'Sector Focus',
    '/partnerships': 'Capabilities',
    '/initiatives': 'Programs',
    '/activity-domains': 'Sector Focus',
    '/operating-model': 'Programs',
    '/regional-presence': 'Partnerships',
    '/contact': 'Contact',
  },
  ar: {
    '/': 'الرئيسية',
    '/about': 'عن PAG',
    '/capabilities': 'القدرات',
    '/areas-of-operation': 'التركيز القطاعي',
    '/partnerships': 'القدرات',
    '/initiatives': 'البرامج',
    '/activity-domains': 'التركيز القطاعي',
    '/operating-model': 'البرامج',
    '/regional-presence': 'الشراكات',
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
    exploreDomains: 'Explore Areas of Operation',
    startInquiry: 'Start Institutional Inquiry',
    mandateFeed: 'Mandate Feed',
    structuringSignals: 'Current Structuring Signals',
    corridorVisualAlt: 'PAG corridor visual',
    activityIntro: 'Pan African Group supports infrastructure systems across strategic sectors that represent critical components of modern institutional and national systems.',
    corridorMapKicker: 'Corridor Coverage Map',
    operatingAreas: 'Gulf-East Africa Operating Areas',
    contactCta: 'Discuss Institutional Collaboration',
    presenceIntro: 'Pan African Group collaborates with government institutions, financial and development stakeholders, infrastructure operators, global technology providers, and regional implementation partners.',
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
    activityIntro: 'تدعم بان أفريكا جروب أنظمة البنية التحتية عبر قطاعات استراتيجية تمثل مكونات أساسية للأنظمة المؤسسية والوطنية الحديثة.',
    corridorMapKicker: 'خريطة تغطية الممر',
    operatingAreas: 'مناطق العمل في الخليج وشرق أفريقيا',
    contactCta: 'مناقشة التعاون المؤسسي',
    presenceIntro: 'تتعاون بان أفريكا جروب مع المؤسسات الحكومية والجهات المالية والتنموية ومشغلي البنية التحتية ومزودي التكنولوجيا العالميين وشركاء التنفيذ الإقليميين.',
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

