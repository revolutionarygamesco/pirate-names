import { selectRandomElement, isString } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { otherNames } from '../../../ids.ts'

const generateJamu = async (caste: string): Promise<string> => {
  const result = await drawGuarded(otherNames.Mandinka.Jamu[caste], isString, 'Jara')
  const variants = result.split('/').map(variant => variant.trim())
  return selectRandomElement(variants)
}

export default generateJamu
