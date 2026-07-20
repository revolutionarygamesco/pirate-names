import { chance, selectRandomElement } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface FrenchPersonalNameData extends PersonalNameData {
  family: string
}

export const FrenchPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('WPdAj2c6hKX2a4v3'),
  Masculine: getRollTableUUID('ZI93VXQaPHxeW5c7'),
  Surnames: getRollTableUUID('bT9wBtgWV3ZA0sMr')
}

export const FrenchCompoundNames: Record<string, string[]> = {
  Jean: ['Baptiste', 'Paul', 'Pierre', 'Louis', 'Claude', 'François',
    'Jacques', 'Charles', 'Michel', 'Joseph', 'Marc', 'Luc', 'Philippe',
    'Christophe', 'René', 'Antoine', 'Gabriel'],
  Marie: ['Louise', 'Thérèse', 'Christine', 'Adélaïde', 'Hélène', 'Madeleine',
    'Geneviève', 'Josèphe'],
  Anne: ['Sophie', 'Élisabeth', 'Marie', 'Laure', 'Louise', 'Marguerite']
}

class FrenchPersonalName extends PersonalName {
  family: string

  constructor (data?: Partial<FrenchPersonalNameData>) {
    super(data)
    this.nationality = 'French'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Jean' : 'Marie')
    this.family = data?.family ?? 'Dupont'
    this.full = data?.full ?? `${this.personal} ${this.family}`
  }

  toObject (): FrenchPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal,
      family: this.family
    }
  }

  static getCompoundOptions (base: string): string[] {
    if (base in FrenchCompoundNames) return FrenchCompoundNames[base]
    return []
  }

  static async generate (
    data?: Partial<FrenchPersonalNameData>
  ): Promise<FrenchPersonalName[]> {
    const gender = data?.gender ?? selectRandomGender()
    const given = data?.personal ?? await drawStr(FrenchPersonalNameTables[gender], gender === 'Masculine' ? 'Jean' : 'Marie')
    const family = data?.family ?? await drawStr(FrenchPersonalNameTables.Surnames, 'Doe')

    const compoundOptions = FrenchPersonalName.getCompoundOptions(given)
    const personal = compoundOptions.length > 0 && chance(1, 2)
      ? `${given}-${selectRandomElement(compoundOptions)}`
      : given

    const full = `${personal} ${family}`
    return [new FrenchPersonalName({ gender, personal, family, full })]
  }
}

export default FrenchPersonalName
