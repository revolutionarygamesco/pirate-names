import { makeEnum } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { nation } from '../../../ids.ts'

export const nationalities = ['Akan', 'Bantu', 'Dutch',
  'English', 'Fon', 'French', 'Igbo', 'Irish', 'Kalinago', 'Mandinka',
  'Miskito', 'Portuguese', 'Scottish', 'Spanish', 'Taíno', 'Welsh', 'Yoruba'] as const
export type Nationality = typeof nationalities[number]
export const { guard: isNationality } = makeEnum(nationalities)

export const selectRandomNationality = async (
  scope: 'person' | 'pirate' = 'person'
): Promise<Nationality> => {
  return await drawGuarded(nation[scope], isNationality, 'Spanish')
}
