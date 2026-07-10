import rollTableFallback from '../../randomizers/roll-table-fallback.ts'
import concatWithElision from './elide.ts'
import { otherNames } from '../../../ids.ts'

const generateTainoName = async (
  gender: Gender
): Promise<string> => {
  const subj = await rollTableFallback(otherNames.Taino[gender].Subjects, 'Güey')
  let mod = await rollTableFallback(otherNames.Taino[gender].Modifiers, 'toa')

  while (subj.toLowerCase() === mod.toLowerCase()) {
    mod = await rollTableFallback(otherNames.Taino[gender].Modifiers, 'toa')
  }

  return concatWithElision(subj, mod)
}

export default generateTainoName
