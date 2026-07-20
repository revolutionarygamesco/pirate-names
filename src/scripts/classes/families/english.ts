import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'

export const EnglishFamilyNames = getRollTableUUID('EVtxLwQ1W8ML3vKL')

class EnglishFamily extends NamedFamily {
  constructor(data?: Partial<NamedFamilyData>) {
    super(data)
    this.nationality = 'English'
  }

  static async generate (
    data?: Partial<NamedFamilyData>
  ): Promise<EnglishFamily> {
    const name = data?.name ?? await drawStr(EnglishFamilyNames, 'Smith')
    return new EnglishFamily({ name, ...data })
  }
}

export default EnglishFamily
