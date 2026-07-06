import roll from './roll.ts'

const pickFamilySize = async (): Promise<number> => {
  const familySizeRoll = await roll('1d100')
  const familySizeBands: Array<{ min: number, max: number, size: number }> = [
    { min: 1, max: 1, size: 1 },
    { min: 2, max: 3, size: 2 },
    { min: 4, max: 8, size: 3 },
    { min: 9, max: 16, size: 4 },
    { min: 17, max: 28, size: 5 },
    { min: 29, max: 42, size: 6 },
    { min: 43, max: 58, size: 7 },
    { min: 59, max: 71, size: 8 },
    { min: 72, max: 81, size: 9 },
    { min: 82, max: 89, size: 10 },
    { min: 90, max: 94, size: 11 },
    { min: 95, max: 98, size: 12 },
    { min: 99, max: 100, size: 13 }
  ]

  for (const { min, max, size } of familySizeBands) {
    if (min <= familySizeRoll && max >= familySizeRoll) return size
  }

  return 1
}

export default pickFamilySize
