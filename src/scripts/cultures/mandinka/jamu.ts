import rollTableFallback from '../../randomizers/roll-table-fallback.ts'
import selectRandomElement from '../../randomizers/el.ts'
import { otherNames } from '../../../ids.ts'

const generateJamu = async (caste: string): Promise<string> => {
  const result = await rollTableFallback(otherNames.Mandinka.Jamu[caste], 'Jara')
  const variants = result.split('/').map(variant => variant.trim())
  return selectRandomElement(variants)
}

export default generateJamu
