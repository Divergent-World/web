/** Canonical origin for the portal itself. */
export const SITE_URL = 'https://divergent.world'

export const SITE_NAME = 'Divergent World'

export const SITE_DESCRIPTION =
  'Divergent World builds technologies, media, and products that increase human potential.'

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
