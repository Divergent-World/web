import assert from 'node:assert/strict'
import test from 'node:test'
import { reduceUniverseSelection } from '../app/components/universe/selection-model.ts'

test('branch selection changes the entry without pausing orbital state', () => {
  assert.deepEqual(
    reduceUniverseSelection(
      { selectedId: 'world', focusSignal: 0 },
      'media',
    ),
    { selectedId: 'media', focusSignal: 1 },
  )
})

test('every activation emits a camera focus signal', () => {
  assert.deepEqual(
    reduceUniverseSelection(
      { selectedId: 'design', focusSignal: 2 },
      'design',
    ),
    { selectedId: 'design', focusSignal: 3 },
  )
})
