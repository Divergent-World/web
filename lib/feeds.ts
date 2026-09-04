import { CAREER_ROLES } from './careers.ts'
import { NEWS } from './news.ts'
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from './site.ts'
import { DIVISIONS } from './universe.ts'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function buildRss(): string {
  const items = NEWS.map((entry) => {
    const url = absoluteUrl(`/news/${entry.slug}`)
    const publicationDate = new Date(`${entry.publishedAt}T00:00:00Z`).toUTCString()
    return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(entry.description)}</description>
      <category>${escapeXml(entry.category)}</category>
      <pubDate>${publicationDate}</pubDate>
    </item>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME} News</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
${items}
  </channel>
</rss>\n`
}

export function buildLlmsText(): string {
  const companies = DIVISIONS.map(
    (company) => `- ${company.name} - ${company.status}: ${company.role}. ${company.mission}`,
  ).join('\n')
  const roles = CAREER_ROLES.map(
    (role) => `- ${role.title} - ${role.status}. ${role.callout}.`,
  ).join('\n')

  return `# ${SITE_NAME}

${SITE_DESCRIPTION}

## Create Gravity

Find signal. Become coherent. Create gravity. Attract and transform. Advance the frontier. Build together.

## Companies

${companies}

Divergent Ventures and Divergent Properties are future-horizon companies, not active operations.

## Careers

${roles}

## Canonical links

- Home: ${absoluteUrl('/')}
- Our Work: ${absoluteUrl('/companies')}
- About: ${absoluteUrl('/about')}
- Manifesto: ${absoluteUrl('/manifesto')}
- News: ${absoluteUrl('/news')}
- Careers: ${absoluteUrl('/careers')}
- RSS: ${absoluteUrl('/rss.xml')}
- Revelation: https://revelation.divergent.world

Contact: ${CONTACT_EMAIL}
`
}
