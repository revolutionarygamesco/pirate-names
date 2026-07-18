import { makeStringUnionGuard } from '@revolutionarygamesco/common'
import { nation } from '../../ids.ts'
import rollTable from '../randomizers/roll-table.ts'

export const colors: Colors[] = ['Spanish', 'British', 'French', 'Dutch']
export const isColors = makeStringUnionGuard(colors)

export const pickColors = async (): Promise<Colors> => {
  const drawn = await rollTable(nation.ship, { displayChat: false })
  const n = drawn?.description
  return isColors(n) ? n : 'Spanish'
}

export const nationalities: Nationality[] = ['Akan', 'Bantu', 'Dutch',
  'English', 'Fon', 'French', 'Igbo', 'Irish', 'Kalinago', 'Mandinka',
  'Miskito', 'Portuguese', 'Scottish', 'Spanish', 'Taino', 'Welsh', 'Yoruba']
export const isNationality = makeStringUnionGuard(nationalities)

export const pickNationality = async (scope: 'person' | 'pirate' = 'person'): Promise<Nationality> => {
  const drawn = await rollTable(nation[scope], { displayChat: false })
  const n = drawn?.description
  return isNationality(n) ? n : 'Spanish'
}
