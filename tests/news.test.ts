import assert from 'node:assert/strict'
import test from 'node:test'
import { NEWS, getNewsEntry } from '../lib/news.ts'

test('publishes the initial institutional record in reverse chronology', () => {
  assert.deepEqual(
    NEWS.map(({ slug, category }) => ({ slug, category })),
    [
      { slug: 'revelation-the-first-world', category: 'Release' },
      { slug: 'create-gravity', category: 'Article' },
      { slug: 'one-institution-five-companies', category: 'Announcement' },
    ],
  )
  assert.ok(NEWS.every((entry) => /^2026-09-0[1-3]$/.test(entry.publishedAt)))
})

test('gives every publication enough public content and a canonical lookup', () => {
  for (const entry of NEWS) {
    assert.ok(entry.description.length >= 70)
    assert.ok(entry.paragraphs.length >= 3)
    assert.equal(getNewsEntry(entry.slug), entry)
  }
  assert.equal(getNewsEntry('missing'), undefined)
})
