import roll from '../../randomizers/roll.ts'
import generateGivenName from '../../given.ts'

const generatePortugueseGivenNames = async (
  gender: Gender
): Promise<string[]> => {
  const n = await roll('d2')
  const names: string[] = []

  for (let i = 0; i < n; i++) {
    names.push(await generateGivenName('Portuguese', gender))
  }

  return names
}

export default generatePortugueseGivenNames
