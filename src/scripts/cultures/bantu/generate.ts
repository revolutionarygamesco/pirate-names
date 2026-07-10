import pickSpecialNames from './special.ts'
import rollTableFallback from '../../randomizers/roll-table-fallback.ts'
import { otherNames } from '../../../ids.ts'

const generateBantuName = async (
  gender: Gender
): Promise<string> => {
  const special = await pickSpecialNames()

  const names = []

  if (special === 'santu') names.push(await rollTableFallback(otherNames.Bantu.Santu, 'Ntoni'))

  names.push(await rollTableFallback(otherNames.Bantu.Nkumbu, 'Zola'))
  names.push('a')
  names.push(await rollTableFallback(otherNames.Bantu.Nkumbu, 'Zola'))

  if (special === 'initiation') names.push(await rollTableFallback(otherNames.Bantu.Santu, gender === 'Masculine' ? 'Nsumbu' : 'Lubondo'))

  return names.join(' ')
}

export default generateBantuName
