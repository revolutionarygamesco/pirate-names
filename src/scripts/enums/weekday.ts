import { weekdays } from '../../ids.ts'
import rollTable from '../randomizers/roll-table.ts'

export const weekdayNames: Weekday[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const isWeekday = (candidate: unknown): candidate is Weekday => {
  if (typeof candidate !== 'string') return false
  return weekdayNames.includes(candidate as Weekday)
}

export const pickWeekday = async (): Promise<Weekday> => {
  const drawn = await rollTable(weekdays, { displayChat: false })
  const n = drawn?.description
  return isWeekday(n) ? n : weekdayNames[Math.floor(Math.random() * weekdayNames.length)]
}
