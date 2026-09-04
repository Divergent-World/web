import assert from 'node:assert/strict'
import test from 'node:test'
import { CAREER_ROLES, getCareerRole } from '../lib/careers.ts'

test('publishes Executive Assistant honestly as a future opening', () => {
  assert.deepEqual(
    CAREER_ROLES.map(({ slug, title, status, callout }) => ({
      slug,
      title,
      status,
      callout,
    })),
    [
      {
        slug: 'executive-assistant',
        title: 'Executive Assistant',
        status: 'Future opening',
        callout: 'Expressions of interest welcome',
      },
    ],
  )
})

test('provides a role-specific expression-of-interest action', () => {
  const role = CAREER_ROLES[0]
  assert.equal(getCareerRole(role.slug), role)
  assert.match(role.emailHref, /^mailto:alirahman\.dev@gmail\.com\?subject=/)
  assert.match(decodeURIComponent(role.emailHref), /Executive Assistant/)
  assert.equal(getCareerRole('missing'), undefined)
})
