import { makeEnum } from '@revolutionarygamesco/common'

export const weekdays = ['Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
export type Weekday = typeof weekdays[number]
export const {
  guard: isWeekday,
  randomizer: selectRandomWeekday
} = makeEnum(weekdays)
