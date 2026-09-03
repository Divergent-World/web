import assert from 'node:assert/strict'
import test from 'node:test'
import { reduceUniverseSelection } from '../app/components/universe/selection-model.ts'

test('branch selection changes the entry without pausing orbital state', () => {
  assert.deepEqual(
    reduceUniverseSelection(
      { selectedId: 'world', resetSignal: 0 },
      'media',
    ),
    { selectedId: 'media', resetSignal: 0 },
  )
})

test('world selection increments the camera reset signal', () => {
  assert.deepEqual(
    reduceUniverseSelection(
      { selectedId: 'design', resetSignal: 2 },
      'world',
    ),
    { selectedId: 'world', resetSignal: 3 },
  )
})
