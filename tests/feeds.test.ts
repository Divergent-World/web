import assert from 'node:assert/strict'
import test from 'node:test'
import { buildLlmsText, buildRss } from '../lib/feeds.ts'

test('builds a canonical RSS feed containing every News entry', () => {
  const rss = buildRss()
  assert.match(rss, /<title>Divergent World News<\/title>/)
  assert.match(rss, /https:\/\/www\.divergent\.world\/news\/create-gravity/)
  assert.doesNotMatch(rss, /assets\.divergent\.world/)
})

test('builds concise agent-readable public context', () => {
  const content = buildLlmsText()
  assert.match(content, /^# Divergent World/m)
  assert.match(content, /learning organization for doers/)
  assert.match(content, /Divergent Ventures - Future horizon/)
  assert.match(content, /\/manifesto/)
  assert.match(content, /Company: https:\/\/www\.divergent\.world\/about/)
  assert.doesNotMatch(content, /Our Work:/)
  assert.doesNotMatch(content, /0xZero/)
})
