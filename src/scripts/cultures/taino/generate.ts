import { isString, retryUntil } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { type Gender } from '../../enums/gender.ts'
import concatWithElision from './elide.ts'
import { otherNames } from '../../../ids.ts'

const generateTainoName = async (
  gender: Gender
): Promise<string> => {
  const subj = await drawGuarded(otherNames.Taino[gender].Subjects, isString, 'Güey')
  const mod = await retryUntil(async () => await drawGuarded(otherNames.Taino[gender].Modifiers, isString, 'toa'), mod => mod !== subj, { fallback: 'toa' })
  return concatWithElision(subj, mod)
}

export default generateTainoName
