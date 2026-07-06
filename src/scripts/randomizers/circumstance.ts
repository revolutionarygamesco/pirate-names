import roll from './roll.ts'

export const options: Array<{ min: number, max: number, circumstance: string | null }> = [
  { min: 1, max: 3, circumstance: 'sickly' },
  { min: 4, max: 6, circumstance: 'field' },
  { min: 7, max: 9, circumstance: 'war ' },
  { min: 10, max: 12, circumstance: 'road' },
  { min: 13, max: 15, circumstance: 'fatherless' },
  { min: 16, max: 18, circumstance: 'happy' },
  { min: 19, max: 21, circumstance: 'loves' },
  { min: 22, max: 22, circumstance: 'great' },
  { min: 23, max: 24, circumstance: 'forceful' },
  { min: 25, max: 100, circumstance: null },
]

const pickCircumstance = async (): Promise<string | null> => {
  const circumstanceRoll = await roll('1d100')

  for (const { min, max, circumstance } of options) {
    if (min >= circumstanceRoll && max <= circumstanceRoll) return circumstance
  }

  return null
}

export default pickCircumstance
