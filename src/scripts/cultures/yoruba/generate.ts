import { type Gender } from '../../enums/gender.ts'
import generateAbiso from './abiso.ts'
import selectRandomTwinStatus from '../../randomizers/twin.ts'
import selectRandomCircumstance from '../../randomizers/circumstance.ts'
import circumstanceNames from './circumstance.ts'

const generateYorubaName = async (
  gender: Gender,
  circumstances?: Partial<BirthCircumstances>
): Promise<string> => {
  const twin = circumstances?.twin ?? selectRandomTwinStatus(2)
  const circumstance = circumstances?.special ?? selectRandomCircumstance()
  const names = [await generateAbiso(gender)]

  if (twin === 1) {
    names.push('Táíwò')
  } else if (twin === 2) {
    names.push('Kẹ́hìndé')
  } else if (circumstance && circumstance in circumstanceNames) {
    names.push(circumstanceNames[circumstance])
  }

  return names.join(' ')
}

export default generateYorubaName
