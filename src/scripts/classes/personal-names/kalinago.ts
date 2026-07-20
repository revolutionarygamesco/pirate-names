import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import KalinagoFamily, { KalinagoMasculineNames } from '../families/kalinago.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface KalinagoPersonalNameData extends PersonalNameData {}

export const KalinagoPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('yczM4bZ4HPALuC36'),
  Masculine: KalinagoMasculineNames
}

class KalinagoPersonalName extends PersonalName {
  constructor (data?: Partial<KalinagoPersonalNameData>) {
    super(data)
    this.nationality = 'Kalinago'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Wukeri' : 'Eliama')
    this.full = data?.full ?? this.personal
  }

  toObject (): KalinagoPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal
    }
  }

  static async generate (
    data?: Partial<KalinagoPersonalNameData>,
    context?: Partial<{ family: KalinagoFamily }>
  ): Promise<KalinagoPersonalName[]> {
    const family = context?.family ?? await KalinagoFamily.generate()
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(KalinagoPersonalNameTables[gender], gender === 'Masculine' ? 'Wukeri' : 'Eliama')
    return [new KalinagoPersonalName({ gender, personal, full: `${personal} ${family.renderPatronym()}` })]
  }
}

export default KalinagoPersonalName
