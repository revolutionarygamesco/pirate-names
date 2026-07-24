import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import PatrilinealFamily, { type PatrilinealFamilyData } from './patrilineal.ts'

export interface KalinagoFamilyData extends PatrilinealFamilyData {}

export const KalinagoMasculineNames = getRollTableUUID('3NtXeNj9VaeJzfxr')

class KalinagoFamily extends PatrilinealFamily {
  constructor(data?: Partial<KalinagoFamilyData>) {
    super(data)
    this.nationality = 'Kalinago'
    this.patriarch = data?.patriarch === undefined ? 'Wukeri' : this.patriarch
  }

  renderPatronym (): string {
    return this.patriarch
  }

  static async generate (
    data?: Partial<KalinagoFamilyData>
  ): Promise<KalinagoFamily> {
    const patriarch = data?.patriarch ?? await drawStr(KalinagoMasculineNames, 'Wukeri')
    return new KalinagoFamily({ patriarch, ...data })
  }
}

export default KalinagoFamily
