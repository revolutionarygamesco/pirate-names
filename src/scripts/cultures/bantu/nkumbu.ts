import rollTable from '../../randomizers/roll-table.ts'
import { otherNames } from '../../../ids.ts'

const generateNkumbu = async (): Promise<string> => {
  const drawn = await rollTable(otherNames.Bantu.Nkumbu, { displayChat: false })
  return drawn?.description ?? 'Zola'
}

export default generateNkumbu
