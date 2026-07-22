import { chance, selectRandomBetween } from '@revolutionarygamesco/common'

export type TwinStatus = 1 | 2 | false

export const isTwinStatus = (candidate: unknown): candidate is TwinStatus => {
  return [1, 2, false]
    .map(x => candidate === x)
    .some(test => test)
}

export const selectRandomTwinStatus = (
  twinsPerK: number = 60
): TwinStatus => {
  if (!chance(twinsPerK, 1000)) return false
  return selectRandomBetween( 1, 2) as 1 | 2
}
