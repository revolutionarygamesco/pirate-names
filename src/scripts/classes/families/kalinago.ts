import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import PatrilinealFamily, { type PatrilinealFamilyData } from './patrilineal.ts'

export const KalinagoMasculineNames = getRollTableUUID('3NtXeNj9VaeJzfxr')

class KalinagoFamily extends PatrilinealFamily {
  constructor(data?: Partial<PatrilinealFamilyData>) {
    super(data)
    this.nationality = 'Kalinago'
    this.patriarch = this.patriarch === 'John' ? 'Wukeri' : this.patriarch
  }

  renderPatronym (): string {
    return this.patriarch
  }

  static async generate (
    data?: Partial<PatrilinealFamilyData>
  ): Promise<KalinagoFamily> {
    const patriarch = data?.patriarch ?? await drawStr(KalinagoMasculineNames, 'Wukeri')
    return new KalinagoFamily({ patriarch, ...data })
  }
}

export default KalinagoFamily
