import { createClient } from '@sanity/client';
import type { SiteContent } from './contentLoader';

type MaybeSection = Record<string, unknown> | null;

interface SanityQueryResult {
  hero: MaybeSection;
  about: MaybeSection;
  activities: MaybeSection;
  model: MaybeSection;
  presence: MaybeSection;
  insights: MaybeSection;
  insightPosts: Array<Record<string, unknown>>;
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
      "insights": *[_type == "insights"][0],
      "insightPosts": *[_type == "insightPost"] | order(coalesce(publishedAt, _createdAt) desc) {
        "_id": _id,
        "title": title,
        "excerpt": excerpt,
        "topic": topic,
        "publishedAt": coalesce(publishedAt, _createdAt),
        "image": coalesce(image, ""),
        "slug": slug.current
      },
      "contact": *[_type == "contact"][0],
      "footer": *[_type == "footer"][0],
      "partners": *[_type == "partners"][0],
      "governance": *[_type == "governance"][0]
    }`;

    const result = await client.fetch<SanityQueryResult>(query);
    const insightsData = pickData(result.insights) as Record<string, unknown> | undefined;
    const insightPosts = (result.insightPosts ?? []).map((post, index) => ({
      id: String(post._id ?? `insight-${index + 1}`),
      title: String(post.title ?? ''),
      excerpt: String(post.excerpt ?? ''),
      topic: String(post.topic ?? ''),
      publishedAt: String(post.publishedAt ?? ''),
      image: String(post.image ?? ''),
      slug: String(post.slug ?? ''),
    }));
    const hasInsightsSectionData = Boolean(insightsData && Object.keys(insightsData).length > 0);
    const normalizedInsights: SiteContent['insights'] = {
      scriptText: String(insightsData?.scriptText ?? ''),
      subtitle: String(insightsData?.subtitle ?? ''),
      mainTitle: String(insightsData?.mainTitle ?? ''),
      introText: String(insightsData?.introText ?? ''),
      viewAllText: String(insightsData?.viewAllText ?? ''),
      posts: insightPosts.length > 0 ? insightPosts : ((insightsData?.posts as SiteContent['insights']['posts']) ?? []),
    };

    return {
      hero: pickData(result.hero) as SiteContent['hero'] | undefined,
      about: pickData(result.about) as SiteContent['about'] | undefined,
      activities: pickData(result.activities) as SiteContent['activities'] | undefined,
      model: pickData(result.model) as SiteContent['model'] | undefined,
      presence: pickData(result.presence) as SiteContent['presence'] | undefined,
      insights: hasInsightsSectionData || insightPosts.length > 0
        ? normalizedInsights
        : undefined,
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
