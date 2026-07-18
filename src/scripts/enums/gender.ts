import { makeStringUnionGuard, selectRandomElement } from '@revolutionarygamesco/common'

export const genders: Gender[] = ['Feminine', 'Masculine']
export const isGender = makeStringUnionGuard(genders)
export const pickGender = () => selectRandomElement(genders)
