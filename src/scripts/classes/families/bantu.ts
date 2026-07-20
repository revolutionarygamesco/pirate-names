import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import PatrilinealFamily, { type PatrilinealFamilyData } from './patrilineal.ts'

export const Nkumbu = getRollTableUUID('FseoFZOSLwHCNy4W')

class BantuFamily extends PatrilinealFamily {
  constructor(data?: Partial<PatrilinealFamilyData>) {
    super(data)
    this.nationality = 'Bantu'
    this.patriarch = this.patriarch === 'John' ? 'Zola' : this.patriarch
  }

  static async generate (
    data?: Partial<PatrilinealFamilyData>
  ): Promise<BantuFamily> {
    const patriarch = data?.patriarch ?? await drawStr(Nkumbu, 'Zola')
    return new BantuFamily({ patriarch, ...data })
  }
}

export default BantuFamily
