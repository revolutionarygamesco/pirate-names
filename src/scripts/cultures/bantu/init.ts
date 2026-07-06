import rollTable from '../../randomizers/roll-table.ts'
import { otherNames } from '../../../ids.ts'

const generateInitiationName = async (
  gender: Gender
): Promise<string> => {
  const drawn = await rollTable(otherNames.Bantu.Initiation[gender], { displayChat: false })
  return drawn?.description ?? (gender === 'Masculine' ? 'Nsumbu' : 'Lubondo')
}

export default generateInitiationName
