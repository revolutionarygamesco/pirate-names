import selectRandomBetween from './between.ts'
import pickFamilySize from './family.ts'

const pickBirthOrder = async (): Promise<number | 'last'> => {
  const familySize = await pickFamilySize()
  const order = selectRandomBetween(1, familySize)
  return familySize === order && familySize > 1 ? 'last' : order
}

export default pickBirthOrder
