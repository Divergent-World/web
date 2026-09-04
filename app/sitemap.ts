import type { MetadataRoute } from 'next'
import { CAREER_ROLES } from '@/lib/careers'
import { NEWS } from '@/lib/news'
import { absoluteUrl } from '@/lib/site'
import { DIVISIONS } from '@/lib/universe'

export default function sitemap(): MetadataRoute.Sitemap {
  const institutionalDate = new Date('2026-09-03T00:00:00.000Z')
  const fixedRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: institutionalDate, changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/companies'), lastModified: institutionalDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/about'), lastModified: institutionalDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/manifesto'), lastModified: institutionalDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/news'), lastModified: institutionalDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/careers'), lastModified: institutionalDate, changeFrequency: 'weekly', priority: 0.8 },
  ]
  const companyRoutes: MetadataRoute.Sitemap = DIVISIONS.map((company) => ({
    url: absoluteUrl(`/companies/${company.slug}`),
    lastModified: institutionalDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  const newsRoutes: MetadataRoute.Sitemap = NEWS.map((entry) => ({
    url: absoluteUrl(`/news/${entry.slug}`),
    lastModified: new Date(`${entry.publishedAt}T00:00:00.000Z`),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))
  const careerRoutes: MetadataRoute.Sitemap = CAREER_ROLES.map((role) => ({
    url: absoluteUrl(`/careers/${role.slug}`),
    lastModified: institutionalDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...fixedRoutes, ...companyRoutes, ...newsRoutes, ...careerRoutes]
}
