import roll from './roll.ts'
import selectRandomElement from './el.ts'

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
  { min: 25, max: 27, circumstance: 'dry' },
  { min: 28, max: 28, circumstance: 'water' },
  { min: 29, max: 31, circumstance: 'conflict' },
  { min: 32, max: 32, circumstance: 'market' },
  { min: 33, max: 35, circumstance: 'facedown' },
  { min: 36, max: 37, circumstance: 'day' },
  { min: 38, max: 39, circumstance: 'night' },
  { min: 40, max: 40, circumstance: 'postterm' },
  { min: 41, max: 41, circumstance: 'caul' },
  { min: 42, max: 42, circumstance: 'motherless' },
  { min: 43, max: 43, circumstance: 'crier' },
  { min: 44, max: 44, circumstance: 'breech' },
  { min: 45, max: 45, circumstance: 'knotted' },
  { min: 46, max: 46, circumstance: 'unbroken' },
  { min: 47, max: 47, circumstance: 'festival,festival,festival,festival,egungun,orisa' },
  { min: 48, max: 48, circumstance: 'traveling' },
  { min: 49, max: 49, circumstance: 'overseas' },
  { min: 50, max: 100, circumstance: null }
]

const pickCircumstance = async (): Promise<string | null> => {
  const circumstanceRoll = await roll('1d100')

  for (const { min, max, circumstance } of options) {
    if (min <= circumstanceRoll && max >= circumstanceRoll) {
      if (circumstance === null) return null
      const options = circumstance.split(',')
      return selectRandomElement(options)
    }
  }

  return null
}

export default pickCircumstance
