import { getObjectRecord, isString } from '@revolutionarygamesco/common'

export interface GenderedTitle {
  m: string
  f: string
}

export const isGenderedTitle = (
  candidate: unknown
): candidate is GenderedTitle => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [isString(obj.m), isString(obj.f)].every(test => test)
}
