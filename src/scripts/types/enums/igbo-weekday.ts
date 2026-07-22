import { makeEnum } from '@revolutionarygamesco/common'

export const igboWeekdays = ['Eke', 'Oye', 'Afor', 'Nkwo'] as const
export type IgboWeekday = typeof igboWeekdays[number]
export const {
  guard: isIgboWeekday,
  randomizer: selectRandomIgboWeekday
} = makeEnum(igboWeekdays)
