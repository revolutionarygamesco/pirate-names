import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'

export const AkanFamilyNames = getRollTableUUID('6gusbvIigQXTCmPC')

export interface AkanFamilyData extends NamedFamilyData {}

class AkanFamily extends NamedFamily {
  constructor(data?: Partial<AkanFamilyData>) {
    super(data)
    this.nationality = 'Akan'
    this.name = this.name === 'Smith' ? 'Mensah' : this.name
  }

  static async generate (
    data?: Partial<AkanFamilyData>
  ): Promise<AkanFamily> {
    const name = data?.name ?? await drawStr(AkanFamilyNames, 'Mensah')
    return new AkanFamily({ name, ...data })
  }
}

export default AkanFamily
