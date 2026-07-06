import selectRandomElement from '../randomizers/el.ts'

export const weekdayNames: Weekday[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const isWeekday = (candidate: unknown): candidate is Weekday => {
  if (typeof candidate !== 'string') return false
  return weekdayNames.includes(candidate as Weekday)
}

export const pickWeekday = async (): Promise<Weekday> => {
  return selectRandomElement(weekdayNames)
}
