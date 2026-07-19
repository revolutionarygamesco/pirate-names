import { isString } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { type Gender } from '../../enums/gender.ts'
import { otherNames } from '../../../ids.ts'

const generateMiskitoName = async (
  gender: Gender
): Promise<string> => {
  const subjTable = otherNames.Miskito[gender].Subjects
  const modTable = otherNames.Miskito[gender].Modifiers

  const subjFallback = gender === 'Masculine' ? 'Lapta' : 'Kati'
  const modFallback = gender === 'Masculine' ? 'Tara' : 'Pihni'

  const subj = await drawGuarded(subjTable, isString, subjFallback)
  const mod = await drawGuarded(modTable, isString, modFallback)

  return `${subj} ${mod}`
}

export default generateMiskitoName
