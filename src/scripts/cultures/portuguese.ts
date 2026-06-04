import roll from '../roll.ts'
import generateGivenName from '../given.ts'
import generateSurname from '../surname.ts'

const generatePortugueseSurnames = async (): Promise<string[]> => {
  const n = await roll('d4')
  const names: string[] = []

  for (let i = 0; i < n; i++) {
    names.push(await generateSurname('Portuguese'))
  }

  return names
}

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

const generatePortugueseName = async (
  gender: Gender
): Promise<string> => {
  const given = await generatePortugueseGivenNames(gender)
  const surnames = await generatePortugueseSurnames()
  return [...given, ...surnames].join(' ')
}

export default generatePortugueseName
