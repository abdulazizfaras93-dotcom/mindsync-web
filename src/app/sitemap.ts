import { MetadataRoute } from 'next';

const BASE = 'https://www.mindsynckw.com';

const VERTICALS = ['clinics', 'salons', 'spa', 'gyms', 'garages', 'restaurants', 'real-estate', 'home-businesses']

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/discovery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...VERTICALS.map(v => ({
      url: `${BASE}/${v}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ]
}
