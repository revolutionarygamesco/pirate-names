import { isString } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomWeekday, type Weekday } from '../../enums/weekday.ts'
import { type Gender } from '../../enums/gender.ts'
import selectRandomBirthOrder from '../../randomizers/birth-order.ts'
import pickTwin from '../../randomizers/twin.ts'
import pickCircumstance from '../../randomizers/circumstance.ts'
import birthOrderNames from './birth-order.ts'
import circumstanceNames from './circumstance.ts'
import { otherNames } from '../../../ids.ts'

const generateAkanName = async (
  gender: Gender,
  circumstances?: Partial<BirthCircumstances>
): Promise<string> => {
  const weekday: Weekday = circumstances?.weekday ?? selectRandomWeekday()
  const order = circumstances?.order ?? selectRandomBirthOrder()
  const twin = circumstances?.twin ?? pickTwin()
  const circumstance = circumstances?.special ?? pickCircumstance()

  const names: string[] = [
    await drawGuarded(otherNames.Akan.WeekdayNames[weekday][gender], isString, gender === 'Feminine' ? 'Akosua' : 'Kwasi'),
    birthOrderNames[order.toString()][gender]
  ]

  if (twin === 1) {
    names.push(gender === 'Feminine' ? 'Ataá Panyin' : 'Attá Panyin')
  } else if (twin === 2) {
    names.push(gender === 'Feminine' ? 'Ataá Kakraba' : 'Attá Kakra')
  } else if (circumstance && circumstance in circumstanceNames) {
    names.push(circumstanceNames[circumstance][gender])
  }

  names.push(await drawGuarded(otherNames.Akan.Surnames, isString, 'Mensah'))
  return names.join(' ')
}

export default generateAkanName
