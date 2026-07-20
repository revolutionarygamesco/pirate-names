import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'

export const AkanFamilyNames = getRollTableUUID('6gusbvIigQXTCmPC')

class AkanFamily extends NamedFamily {
  constructor(data?: Partial<NamedFamilyData>) {
    super(data)
    this.nationality = 'Akan'
    this.name = this.name === 'Smith' ? 'Mensah' : this.name
  }

  static async generate (
    data?: Partial<NamedFamilyData>
  ): Promise<AkanFamily> {
    const name = data?.name ?? await drawStr(AkanFamilyNames, 'Mensah')
    return new AkanFamily({ name, ...data })
  }
}

export default AkanFamily
