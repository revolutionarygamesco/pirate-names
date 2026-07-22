import { selectRandomElement, isString } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { type Gender } from '../../types/enums/gender.ts'
import { otherNames } from '../../../ids.ts'

export const igboWeekdayNames = ['Eke', 'Oye', 'Afor', 'Nkwo']

const generateWeekdayName = async (
  gender: Gender
): Promise<string> => {
  const weekday = selectRandomElement(igboWeekdayNames)
  return await drawGuarded(otherNames.Igbo.WeekdayNames[weekday][gender], isString, gender === 'Masculine' ? 'Okoeke' : 'Ekemma')
}

export default generateWeekdayName
