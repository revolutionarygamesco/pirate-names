import { makeEnum } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'

export const nationalities = ['Akan', 'Bantu', 'Dutch',
  'English', 'Fon', 'French', 'Igbo', 'Irish', 'Kalinago', 'Mandinka',
  'Miskito', 'Portuguese', 'Scottish', 'Spanish', 'Taíno', 'Welsh', 'Yoruba'] as const
export type Nationality = typeof nationalities[number]
export const { guard: isNationality } = makeEnum(nationalities)

export const selectRandomNationality = async (
  scope: 'person' | 'pirate' = 'person'
): Promise<Nationality> => {
  const id = scope === 'pirate' ? 'S3jEhiwdL6Pry0nK' : 'NLyKzSrJYnYaU6TJ'
  return await drawGuarded(getRollTableUUID(id), isNationality, 'Spanish')
}
