import selectRandomElement from '../../randomizers/el.ts'
import rollTable from '../../randomizers/roll-table.ts'
import { otherNames } from '../../../ids.ts'

export const igboWeekdayNames = ['Eke', 'Oye', 'Afor', 'Nkwo']

const generateWeekdayName = async (
  gender: Gender
): Promise<string> => {
  const weekday = selectRandomElement(igboWeekdayNames)
  const rolled = await rollTable(otherNames.Igbo.WeekdayNames[weekday][gender], { displayChat: false })
  return rolled?.description ?? (gender === 'Masculine' ? 'Okoeke' : 'Ekemma')
}

export default generateWeekdayName
