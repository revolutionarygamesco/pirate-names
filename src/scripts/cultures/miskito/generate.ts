import rollTableFallback from '../../randomizers/roll-table-fallback.ts'
import { otherNames } from '../../../ids.ts'

const generateMiskitoName = async (
  gender: Gender
): Promise<string> => {
  const subjTable = otherNames.Miskito[gender].Subjects
  const modTable = otherNames.Miskito[gender].Modifiers

  const subjFallback = gender === 'Masculine' ? 'Lapta' : 'Kati'
  const modFallback = gender === 'Masculine' ? 'Tara' : 'Pihni'

  const subj = await rollTableFallback(subjTable, subjFallback)
  const mod = await rollTableFallback(modTable, modFallback)

  return `${subj} ${mod}`
}

export default generateMiskitoName
