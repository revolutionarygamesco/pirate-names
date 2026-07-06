import generateGivenName from '../../given.ts'
import pickTwin from '../../randomizers/twin.ts'
import pickCircumstance from '../../randomizers/circumstance.ts'
import { pickWeekday } from '../../enums/weekday.ts'
import circumstanceNames from '../akan/circumstance.ts'
import weekdayNames from './weekday.ts'

const generateFonName = async (
  gender: Gender,
  circumstances?: Partial<BirthCircumstances>
): Promise<string> => {
  const weekday = circumstances?.weekday ?? await pickWeekday()
  const twin = circumstances?.twin ?? await pickTwin()
  const circumstance = circumstances?.special ?? await pickCircumstance()

  const w = weekdayNames[weekday][gender]
  const wi = Math.floor(Math.random() * w.length)
  const names = [w[wi]]

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
