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
