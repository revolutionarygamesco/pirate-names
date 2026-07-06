import selectRandomBetween from './between.ts'

const selectRandomElement = <T>(arr: T[]): T => {
  const index = selectRandomBetween(0, arr.length - 1)
  return arr[index]
}

export default selectRandomElement
