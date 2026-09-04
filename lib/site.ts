/** Canonical origin for the public site. */
export const SITE_URL = 'https://www.divergent.world'
export const SITE_NAME = 'Divergent World'
export const SITE_DESCRIPTION =
  'Divergent World is a learning organization for doers working at the frontiers of human progress.'
export const CONTACT_EMAIL = 'alirahman.dev@gmail.com'

export function absoluteUrl(path = '/'): string {
  return new URL(path.replace(/^([^/])/, '/$1'), `${SITE_URL}/`).toString()
}

export function createEmailHref({
  subject,
  body,
}: {
  subject: string
  body?: string
}): string {
  const query = new URLSearchParams({ subject })
  if (body) query.set('body', body)
  return `mailto:${CONTACT_EMAIL}?${query.toString().replace(/\+/g, '%20')}`
}

/**
 * Public Cloudflare R2 origin. The bucket is shared across projects and
 * namespaced by prefix, so everything for this site lives under
 * `divergent-world/`. Only ever used to build public URLs — no R2 or S3
 * credentials belong anywhere in this app.
 */
const ASSET_ORIGIN =
  process.env.NEXT_PUBLIC_ASSET_ORIGIN || 'https://assets.divergent.world'

/** Build a public asset URL, e.g. assetUrl('opengraph.png'). */
export function assetUrl(path: string): string {
  return `${ASSET_ORIGIN.replace(/\/+$/, '')}/divergent-world/${path.replace(/^\/+/, '')}`
}
