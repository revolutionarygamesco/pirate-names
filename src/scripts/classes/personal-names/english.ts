import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import EnglishFamily, { EnglishFamilyNames } from '../families/english.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface EnglishPersonalNameData extends PersonalNameData {}

export const EnglishPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('3FurO9qJF79bb11f'),
  Masculine: getRollTableUUID('2rhDoCqCuwAmKABv'),
  Surnames: EnglishFamilyNames
}

class EnglishPersonalName extends PersonalName {
  constructor (data?: Partial<EnglishPersonalNameData>) {
    super(data)
    this.nationality = 'English'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'John' : 'Jane')
    this.full = data?.full ?? this.personal
  }

  toObject (): EnglishPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal
    }
  }

  static async generate (
    data?: Partial<EnglishPersonalNameData>,
    context?: Partial<{ family: EnglishFamily }>
  ): Promise<EnglishPersonalName[]> {
    const family = context?.family ?? await EnglishFamily.generate()
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(EnglishPersonalNameTables[gender], gender === 'Masculine' ? 'John' : 'Jane')
    return [new EnglishPersonalName({ gender, personal, full: `${personal} ${family.name}` })]
  }
}

export default EnglishPersonalName
