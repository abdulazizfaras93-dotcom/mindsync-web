import { MetadataRoute } from 'next';
import { INDUSTRY_SLUGS } from '@/lib/data';

const BASE = 'https://www.mindsynckw.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const industryPages = Object.keys(INDUSTRY_SLUGS).map(slug => ({
    url: `${BASE}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [
    { url: BASE,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/discovery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...industryPages,
  ]
}
