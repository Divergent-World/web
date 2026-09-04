import assert from 'node:assert/strict'
import test from 'node:test'
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_URL,
  absoluteUrl,
  createEmailHref,
} from '../lib/site.ts'

test('uses the production redirect destination as the canonical origin', () => {
  assert.equal(SITE_URL, 'https://www.divergent.world')
  assert.equal(absoluteUrl('/manifesto'), 'https://www.divergent.world/manifesto')
  assert.equal(absoluteUrl('news'), 'https://www.divergent.world/news')
})

test('defines the concise public institutional description', () => {
  assert.equal(
    SITE_DESCRIPTION,
    'Divergent World is a learning organization for doers working at the frontiers of human progress.',
  )
})

test('encodes inquiry subjects and bodies for the verified contact inbox', () => {
  assert.equal(CONTACT_EMAIL, 'alirahman.dev@gmail.com')
  assert.equal(
    createEmailHref({
      subject: 'Executive Assistant — expression of interest',
      body: 'Name:\nCurrent work:',
    }),
    'mailto:alirahman.dev@gmail.com?subject=Executive%20Assistant%20%E2%80%94%20expression%20of%20interest&body=Name%3A%0ACurrent%20work%3A',
  )
})
