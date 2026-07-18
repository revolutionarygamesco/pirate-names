import { makeStringUnionGuard, selectRandomElement } from '@revolutionarygamesco/common'

export const weekdayNames: Weekday[] = ['Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const isWeekday = makeStringUnionGuard(weekdayNames)

export const pickWeekday = async (): Promise<Weekday> => {
  return selectRandomElement(weekdayNames)
}
