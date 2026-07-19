import { selectRandomBetween } from '@revolutionarygamesco/common'
import selectRandomFamilySize from './family.ts'

const selectRandomBirthOrder = (): number => {
  const familySize = selectRandomFamilySize()
  return selectRandomBetween(1, familySize)
}

export default selectRandomBirthOrder
