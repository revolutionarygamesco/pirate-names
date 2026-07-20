import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import PersonalName, { type PersonalNameData } from './base.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'

export interface EnglishPersonalNameData extends PersonalNameData {
  family: string
}

export const EnglishPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('3FurO9qJF79bb11f'),
  Masculine: getRollTableUUID('2rhDoCqCuwAmKABv'),
  Surnames: getRollTableUUID('EVtxLwQ1W8ML3vKL')
}

class EnglishPersonalName extends PersonalName {
  family: string

  constructor (data?: Partial<EnglishPersonalNameData>) {
    super(data)
    this.nationality = 'English'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'John' : 'Jane')
    this.family = data?.family ?? 'Doe'
    this.full = data?.full ?? `${this.personal} ${this.family}`
  }

  toObject (): EnglishPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal,
      family: this.family
    }
  }

  static async generate (
    data?: Partial<EnglishPersonalNameData>
  ): Promise<EnglishPersonalName> {
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(EnglishPersonalNameTables[gender], gender === 'Masculine' ? 'John' : 'Jane')
    const family = await drawStr(EnglishPersonalNameTables.Surnames, 'Doe')
    const full = `${personal} ${family}`
    return new EnglishPersonalName({ gender, personal, family, full })
  }
}

export default EnglishPersonalName
