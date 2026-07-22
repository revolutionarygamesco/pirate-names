import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import WelshFamily, { WelshFamilyNames, type WelshFamilyData } from '../families/welsh.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface WelshPersonalNameData extends PersonalNameData {
  family: WelshFamilyData
}

export const WelshPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('YK0pV8OsdQmwofY5'),
  Masculine: getRollTableUUID('hlWJ8ygoHMTiRtFD'),
  Surnames: WelshFamilyNames
}

class WelshPersonalName extends PersonalName {
  family: WelshFamily

  constructor (
    data?: Partial<WelshPersonalNameData>,
    context?: Partial<{ family: WelshFamily, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'Welsh'
    this.family = context?.family ?? new WelshFamily(data?.family)
    this.birth = context?.birth ?? new BirthContext(data?.birth, this.family)
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'William' : 'Mary')
  }

  get full (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  toObject (): WelshPersonalNameData {
    return {
      ...super.toObject(),
      family: this.family.toObject()
    }
  }

  static async generate (
    data?: Partial<WelshPersonalNameData>,
    context?: Partial<{ family: WelshFamily }>
  ): Promise<WelshPersonalName[]> {
    const family = context?.family ?? await WelshFamily.generate()
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(WelshPersonalNameTables[gender], gender === 'Masculine' ? 'William' : 'Mary')
    return [new WelshPersonalName({ gender, personal }, { family })]
  }
}

export default WelshPersonalName
