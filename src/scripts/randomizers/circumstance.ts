import { selectRandomElement, selectRandomBand } from '@revolutionarygamesco/common'

const selectRandomCircumstance = (): string | null => {
  const circumstance = selectRandomBand([
    { range: [1, 3], value: 'sickly' },
    { range: [4, 6], value: 'field' },
    { range: [7, 9], value: 'war' },
    { range: [10, 12], value: 'road' },
    { range: [13, 15], value: 'fatherless' },
    { range: [16, 18], value: 'happy' },
    { range: [19, 21], value: 'loves' },
    { range: [22, 22], value: 'great' },
    { range: [23, 24], value: 'forceful' },
    { range: [25, 27], value: 'dry' },
    { range: [28, 28], value: 'water' },
    { range: [29, 31], value: 'conflict' },
    { range: [32, 32], value: 'market' },
    { range: [33, 35], value: 'facedown' },
    { range: [36, 37], value: 'day' },
    { range: [38, 39], value: 'night' },
    { range: [40, 40], value: 'postterm' },
    { range: [41, 41], value: 'caul' },
    { range: [42, 42], value: 'motherless' },
    { range: [43, 43], value: 'crier' },
    { range: [44, 44], value: 'breech' },
    { range: [45, 45], value: 'knotted' },
    { range: [46, 46], value: 'unbroken' },
    { range: [47, 47], value: 'festival,festival,festival,festival,egungun,orisa' },
    { range: [48, 48], value: 'traveling' },
    { range: [49, 49], value: 'overseas' },
    { range: [50, 100], value: '' }
  ])

  if (circumstance === '' || circumstance === null) return null
  return selectRandomElement(circumstance.split(','))
}

export default selectRandomCircumstance
