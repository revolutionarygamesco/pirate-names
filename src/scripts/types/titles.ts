import { getObjectRecord, isString } from '@revolutionarygamesco/common'
import { type TitleDict } from '../classes/personal-names/base.ts'
import { isGenderedTitle, type GenderedTitle } from './gendered-title.ts'

export interface Titles {
  [key: string]: string | GenderedTitle
}

export const isTitles = (
  candidate: unknown
): candidate is Titles => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false

  for (const key in obj) {
    const val = obj[key]
    const tests = [isString(val), isGenderedTitle(val)]
    if (tests.every(test => test === false)) return false
  }

  return true
}

export const mapTitles = (titles: Titles): TitleDict => {
  const dict: TitleDict = {}

  for (const key in titles) {
    if (isString(titles[key])) {
      dict[key] = { Masculine: titles[key], Feminine: titles[key] }
    } else {
      dict[key] = { Masculine: titles[key].m, Feminine: titles[key].f }
    }
  }

  return dict
}
