import { createClient } from '@sanity/client';
import type { SiteContent } from './contentLoader';

type MaybeSection = Record<string, unknown> | null;

interface SanityQueryResult {
  hero: MaybeSection;
  about: MaybeSection;
  activities: MaybeSection;
  model: MaybeSection;
  presence: MaybeSection;
  contact: MaybeSection;
  footer: MaybeSection;
  partners: MaybeSection;
  governance: MaybeSection;
}

const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const sanityDataset = import.meta.env.VITE_SANITY_DATASET;
const sanityApiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2025-01-01';

function hasSanityConfig() {
  return Boolean(sanityProjectId && sanityDataset);
}

function pickData(section: MaybeSection) {
  if (!section) return undefined;
  if (typeof section === 'object' && 'data' in section) {
    return (section as { data?: unknown }).data;
  }
  return section;
}

export async function fetchSanityContent(): Promise<Partial<SiteContent> | null> {
  if (!hasSanityConfig()) {
    return null;
  }

  try {
    const client = createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
      perspective: 'published',
    });

    const query = `{
      "hero": *[_type == "hero"][0],
      "about": *[_type == "about"][0],
      "activities": *[_type == "activities"][0],
      "model": *[_type == "model"][0],
      "presence": *[_type == "presence"][0],
      "contact": *[_type == "contact"][0],
      "footer": *[_type == "footer"][0],
      "partners": *[_type == "partners"][0],
      "governance": *[_type == "governance"][0]
    }`;

    const result = await client.fetch<SanityQueryResult>(query);

    return {
      hero: pickData(result.hero) as SiteContent['hero'] | undefined,
      about: pickData(result.about) as SiteContent['about'] | undefined,
      activities: pickData(result.activities) as SiteContent['activities'] | undefined,
      model: pickData(result.model) as SiteContent['model'] | undefined,
      presence: pickData(result.presence) as SiteContent['presence'] | undefined,
      contact: pickData(result.contact) as SiteContent['contact'] | undefined,
      footer: pickData(result.footer) as SiteContent['footer'] | undefined,
      partners: pickData(result.partners) as SiteContent['partners'] | undefined,
      governance: pickData(result.governance) as SiteContent['governance'] | undefined,
    };
  } catch (error) {
    console.error('Failed to fetch Sanity content. Using local JSON fallback.', error);
    return null;
  }
}
