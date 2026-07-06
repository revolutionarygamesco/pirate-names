import rollTable from '../../randomizers/roll-table.ts'
import { otherNames } from '../../../ids.ts'

const generateWeekdayName = async (weekday: Weekday, gender: Gender): Promise<string> => {
  const drawn = await rollTable(otherNames.Akan.WeekdayNames[weekday][gender], { displayChat: false })
  return drawn?.description ?? (gender === 'Feminine' ? 'Akosua' : 'Kwasi')
}

export default generateWeekdayName
