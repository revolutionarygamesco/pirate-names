import { selectRandomBetween } from '@revolutionarygamesco/common'
import selectRandomFamilySize from './family.ts'

const selectRandomBirthOrder = (): number | 'last' => {
  const familySize = selectRandomFamilySize()
  const order = selectRandomBetween(1, familySize)
  return familySize === order && familySize > 1 ? 'last' : order
}

export default selectRandomBirthOrder
