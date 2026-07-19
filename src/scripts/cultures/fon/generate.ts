import { selectRandomElement } from '@revolutionarygamesco/common'
import { type Gender } from '../../enums/gender.ts'
import generateGivenName from '../../given.ts'
import pickTwin from '../../randomizers/twin.ts'
import pickCircumstance from '../../randomizers/circumstance.ts'
import { selectRandomWeekday, type Weekday } from '../../enums/weekday.ts'
import circumstanceNames from '../akan/circumstance.ts'
import weekdayNames from './weekday.ts'

const generateFonName = async (
  gender: Gender,
  circumstances?: Partial<BirthCircumstances>
): Promise<string> => {
  const weekday: Weekday = circumstances?.weekday ?? selectRandomWeekday()
  const twin = circumstances?.twin ?? pickTwin()
  const circumstance = circumstances?.special ?? pickCircumstance()
  const names = [selectRandomElement(weekdayNames[weekday][gender])]

  if (twin === 1) {
    names.push('Sagbo')
  } else if (twin === 2) {
    names.push('Zinsou')
  } else if (circumstance && circumstance in circumstanceNames) {
    names.push(circumstanceNames[circumstance][gender])
  }

  names.push(await generateGivenName('Fon', gender))

  return names.join(' ')
}

export default generateFonName
