import rollTable from '../../randomizers/roll-table.ts'
import { otherNames } from '../../../ids.ts'

const generateAsanteSurname = async (): Promise<string> => {
  const drawn = await rollTable(otherNames.Akan.Surnames, { displayChat: false })
  return drawn?.description ?? 'Mensah'
}

export default generateAsanteSurname
