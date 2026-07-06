import pickFamilySize from './family.ts'

const pickBirthOrder = async (): Promise<number | 'last'> => {
  const familySize = await pickFamilySize()
  const order = Math.floor(Math.random() * familySize) + 1
  return familySize === order && familySize > 1 ? 'last' : order
}

export default pickBirthOrder
