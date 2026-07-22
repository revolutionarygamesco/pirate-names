import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import KalinagoFamily, { KalinagoMasculineNames, type KalinagoFamilyData } from '../families/kalinago.ts'
import PersonalName, { type PersonalNameData } from './base.ts'


export interface KalinagoPersonalNameData extends PersonalNameData {
  family: KalinagoFamilyData
}

export const KalinagoPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('yczM4bZ4HPALuC36'),
  Masculine: KalinagoMasculineNames
}

class KalinagoPersonalName extends PersonalName {
  family: KalinagoFamily

  constructor (
    data?: Partial<KalinagoPersonalNameData>,
    context?: Partial<{ family: KalinagoFamily, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'Kalinago'
    this.family = context?.family ?? new KalinagoFamily(data?.family)
    this.birth = context?.birth ?? new BirthContext(data?.birth, this.family)
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Wukeri' : 'Eliama')
  }

  get full (): string {
    return `${this.personal} ${this.family.renderPatronym()}`
  }

  toObject (): KalinagoPersonalNameData {
    return {
      ...super.toObject(),
      family: this.family.toObject()
    }
  }

  static async generate (
    data?: Partial<KalinagoPersonalNameData>,
    context?: Partial<{ family: KalinagoFamily, birth: BirthContext }>
  ): Promise<KalinagoPersonalName[]> {
    const family = context?.family ?? await KalinagoFamily.generate()
    const birth = context?.birth ?? new BirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(KalinagoPersonalNameTables[gender], gender === 'Masculine' ? 'Wukeri' : 'Eliama')
    return [new KalinagoPersonalName({ gender, personal }, { family, birth })]
  }
}

export default KalinagoPersonalName
