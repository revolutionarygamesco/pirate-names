import { makeEnum } from '@revolutionarygamesco/common'

export const genders = ['Feminine', 'Masculine'] as const
export type Gender = typeof genders[number]
export const {
  guard: isGender,
  randomizer: selectRandomGender
} = makeEnum(genders)
