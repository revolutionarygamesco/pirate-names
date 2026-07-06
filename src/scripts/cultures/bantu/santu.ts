import rollTable from '../../randomizers/roll-table.ts'
import { otherNames } from '../../../ids.ts'

const generateSantu = async (): Promise<string> => {
  const drawn = await rollTable(otherNames.Bantu.Santu, { displayChat: false })
  return drawn?.description ?? 'Ntoni'
}

export default generateSantu
