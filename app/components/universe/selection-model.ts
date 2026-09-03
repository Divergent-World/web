import type { UniverseEntryId } from '../../../lib/universe'

export type UniverseSelection = {
  selectedId: UniverseEntryId
  resetSignal: number
}

export function reduceUniverseSelection(
  state: UniverseSelection,
  selectedId: UniverseEntryId,
): UniverseSelection {
  return {
    selectedId,
    resetSignal: state.resetSignal + Number(selectedId === 'world'),
  }
}
