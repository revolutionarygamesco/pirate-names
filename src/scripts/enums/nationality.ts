import { nation } from '../../ids.ts'
import rollTable from '../randomizers/roll-table.ts'

export const colors: Colors[] = ['Spanish', 'British', 'French', 'Dutch']
export const nationalities: Nationality[] = ['Akan', 'Bantu', 'Spanish', 'Fon',
  'English', 'French', 'Dutch', 'Igbo', 'Scottish', 'Welsh', 'Irish',
  'Mandinka', 'Portuguese']

export const isColors = (candidate: unknown): candidate is Colors => {
  if (typeof candidate !== 'string') return false
  return colors.includes(candidate as Colors)
}

export const isNationality = (candidate: unknown): candidate is Nationality => {
  if (typeof candidate !== 'string') return false
  return nationalities.includes(candidate as Nationality)
}

export const pickColors = async (): Promise<Colors> => {
  const drawn = await rollTable(nation.ship, { displayChat: false })
  const n = drawn?.description
  return isColors(n) ? n : 'Spanish'
}

export const pickNationality = async (scope: 'person' | 'pirate' = 'person'): Promise<Nationality> => {
  const drawn = await rollTable(nation[scope], { displayChat: false })
  const n = drawn?.description
  return isNationality(n) ? n : 'Spanish'
}