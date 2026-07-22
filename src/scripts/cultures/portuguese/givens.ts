import { selectRandomBetween } from '@revolutionarygamesco/common'
import { type Gender } from '../../types/enums/gender.ts'
import generateGivenName from '../../given.ts'

const generatePortugueseGivenNames = async (
  gender: Gender
): Promise<string[]> => {
  const n = selectRandomBetween(1, 2)
  const names: string[] = []

  for (let i = 0; i < n; i++) {
    names.push(await generateGivenName('Portuguese', gender))
  }

  return names
}

export default generatePortugueseGivenNames
