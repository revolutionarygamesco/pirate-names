import selectRandomElement from '../../randomizers/el.ts'
import rollTableFallback from '../../randomizers/roll-table-fallback.ts'
import { otherNames } from '../../../ids.ts'

export const igboWeekdayNames = ['Eke', 'Oye', 'Afor', 'Nkwo']

const generateWeekdayName = async (
  gender: Gender
): Promise<string> => {
  const weekday = selectRandomElement(igboWeekdayNames)
  return await rollTableFallback(otherNames.Igbo.WeekdayNames[weekday][gender], gender === 'Masculine' ? 'Okoeke' : 'Ekemma')
}

export default generateWeekdayName
