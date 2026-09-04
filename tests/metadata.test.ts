import assert from 'node:assert/strict'
import test from 'node:test'
import {
  ORGANIZATION_JSON_LD,
  createArticleJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from '../lib/metadata.ts'

test('builds canonical and social metadata from one route description', () => {
  const metadata = createPageMetadata({
    title: 'Manifesto',
    description:
      'Create gravity by finding signal, building coherence, and advancing meaningful human frontiers.',
    path: '/manifesto',
  })
  assert.equal(
    metadata.alternates?.canonical,
    'https://www.divergent.world/manifesto',
  )
  assert.equal(metadata.openGraph?.url, 'https://www.divergent.world/manifesto')
  assert.equal(metadata.openGraph?.title, 'Manifesto — Divergent World')
  assert.deepEqual(metadata.openGraph?.images, ['/opengraph-image'])
})

test('publishes only verified organization and article facts', () => {
  assert.equal(ORGANIZATION_JSON_LD['@type'], 'Organization')
  assert.equal(ORGANIZATION_JSON_LD.founder.name, 'Ali Rahman')
  assert.equal('foundingDate' in ORGANIZATION_JSON_LD, false)
  const article = createArticleJsonLd({
    slug: 'create-gravity',
    title: 'Create gravity.',
    description: 'A public doctrine.',
    publishedAt: '2026-09-02',
  })
  assert.equal(
    article.mainEntityOfPage,
    'https://www.divergent.world/news/create-gravity',
  )
})

test('escapes less-than signs in JSON-LD script content', () => {
  assert.equal(
    serializeJsonLd({ value: '</script>' }),
    '{"value":"\\u003c/script>"}',
  )
})
