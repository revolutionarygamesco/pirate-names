import { pickWeekday } from '../../enums/weekday.ts'
import pickBirthOrder from '../../randomizers/birth-order.ts'
import pickTwin from '../../randomizers/twin.ts'
import pickCircumstance from '../../randomizers/circumstance.ts'
import rollTableFallback from '../../randomizers/roll-table-fallback.ts'
import birthOrderNames from './birth-order.ts'
import circumstanceNames from './circumstance.ts'
import { otherNames } from '../../../ids.ts'

const generateAkanName = async (
  gender: Gender,
  circumstances?: Partial<BirthCircumstances>
): Promise<string> => {
  const weekday = circumstances?.weekday ?? await pickWeekday()
  const order = circumstances?.order ?? await pickBirthOrder()
  const twin = circumstances?.twin ?? await pickTwin()
  const circumstance = circumstances?.special ?? await pickCircumstance()

  const names: string[] = [
    await rollTableFallback(otherNames.Akan.WeekdayNames[weekday][gender], gender === 'Feminine' ? 'Akosua' : 'Kwasi'),
    birthOrderNames[order.toString()][gender]
  ]

  if (twin === 1) {
    names.push(gender === 'Feminine' ? 'Ataá Panyin' : 'Attá Panyin')
  } else if (twin === 2) {
    names.push(gender === 'Feminine' ? 'Ataá Kakraba' : 'Attá Kakra')
  } else if (circumstance && circumstance in circumstanceNames) {
    names.push(circumstanceNames[circumstance][gender])
  }

  names.push(await rollTableFallback(otherNames.Akan.Surnames, 'Mensah'))

  return names.join(' ')
}

export default generateAkanName
