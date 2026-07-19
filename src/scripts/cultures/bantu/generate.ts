import { isString } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { type Gender } from '../../enums/gender.ts'
import pickSpecialNames from './special.ts'
import { otherNames } from '../../../ids.ts'

const generateBantuName = async (
  gender: Gender
): Promise<string> => {
  const special = pickSpecialNames()

  const names = []

  if (special === 'santu') names.push(await drawGuarded(otherNames.Bantu.Santu, isString, 'Ntoni'))

  names.push(await drawGuarded(otherNames.Bantu.Nkumbu, isString, 'Zola'))
  names.push('a')
  names.push(await drawGuarded(otherNames.Bantu.Nkumbu, isString, 'Zola'))

  if (special === 'initiation') names.push(await drawGuarded(otherNames.Bantu.Initiation[gender], isString, gender === 'Masculine' ? 'Nsumbu' : 'Lubondo'))

  return names.join(' ')
}

export default generateBantuName
