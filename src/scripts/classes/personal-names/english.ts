import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import EnglishFamily, { EnglishFamilyNames, type EnglishFamilyData } from '../families/english.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface EnglishPersonalNameData extends PersonalNameData {
  family: EnglishFamilyData
}

export const EnglishPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('3FurO9qJF79bb11f'),
  Masculine: getRollTableUUID('2rhDoCqCuwAmKABv'),
  Surnames: EnglishFamilyNames
}

class EnglishPersonalName extends PersonalName {
  family: EnglishFamily

  constructor (
    data?: Partial<EnglishPersonalNameData>,
    context?: Partial<{ family: EnglishFamily, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'English'
    this.family = context?.family ?? new EnglishFamily(data?.family)
    this.birth = context?.birth ?? new BirthContext(data?.birth, this.family)
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'John' : 'Jane')
  }

  get full (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  toObject (): EnglishPersonalNameData {
    return {
      ...super.toObject(),
      family: this.family.toObject()
    }
  }

  static async generate (
    data?: Partial<EnglishPersonalNameData>,
    context?: Partial<{ family: EnglishFamily }>
  ): Promise<EnglishPersonalName[]> {
    const family = context?.family ?? await EnglishFamily.generate()
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(EnglishPersonalNameTables[gender], gender === 'Masculine' ? 'John' : 'Jane')
    return [new EnglishPersonalName({ gender, personal }, { family })]
  }
}

export default EnglishPersonalName
