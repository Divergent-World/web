import type { UniverseEntryId } from '../../../lib/universe'

export type UniverseSelection = {
  selectedId: UniverseEntryId
  focusSignal: number
}

export function reduceUniverseSelection(
  state: UniverseSelection,
  selectedId: UniverseEntryId,
): UniverseSelection {
  return {
    selectedId,
    focusSignal: state.focusSignal + 1,
  }
}
