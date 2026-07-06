import rollTable from '../../randomizers/roll-table.ts'
import selectRandomElement from '../../randomizers/el.ts'
import { otherNames } from '../../../ids.ts'

const generateJamu = async (caste: string): Promise<string> => {
  const drawn = await rollTable(otherNames.Mandinka.Jamu[caste], { displayChat: false })
  const result = drawn?.description ?? 'Jara'
  const variants = result.split('/').map(variant => variant.trim())
  return selectRandomElement(variants)
}

export default generateJamu
