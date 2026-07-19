import { selectRandomBetween } from '@revolutionarygamesco/common'
import pickFamilySize from './family.ts'

const pickBirthOrder = (): number | 'last' => {
  const familySize = pickFamilySize()
  const order = selectRandomBetween(1, familySize)
  return familySize === order && familySize > 1 ? 'last' : order
}

export default pickBirthOrder
