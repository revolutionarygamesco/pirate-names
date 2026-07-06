import roll from '../../randomizers/roll.ts'
import generateSurname from '../../surname.ts'

const generatePortugueseSurnames = async (): Promise<string[]> => {
  const n = await roll('d4')
  const names: string[] = []

  for (let i = 0; i < n; i++) {
    names.push(await generateSurname('Portuguese'))
  }

  return names
}

export default generatePortugueseSurnames
