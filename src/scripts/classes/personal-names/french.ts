import { chance, selectRandomElement } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import FrenchFamily, { FrenchFamilyNames, type FrenchFamilyData } from '../families/french.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface FrenchPersonalNameData extends PersonalNameData {
  family: FrenchFamilyData
}

export const FrenchPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('WPdAj2c6hKX2a4v3'),
  Masculine: getRollTableUUID('ZI93VXQaPHxeW5c7'),
  Surnames: FrenchFamilyNames
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
  family: FrenchFamily

  constructor (
    data?: Partial<FrenchPersonalNameData>,
    context?: Partial<{ family: FrenchFamily, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'French'
    this.family = context?.family ?? new FrenchFamily(data?.family)
    this.birth = context?.birth ?? new BirthContext(data?.birth, this.family)
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Jean' : 'Marie')
  }

  get full (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  toObject (): FrenchPersonalNameData {
    return {
      ...super.toObject(),
      family: this.family.toObject()
    }
  }

  static getCompoundOptions (base: string): string[] {
    if (base in FrenchCompoundNames) return FrenchCompoundNames[base]
    return []
  }

  static async generate (
    data?: Partial<FrenchPersonalNameData>,
    context?: Partial<{ family: FrenchFamily }>
  ): Promise<FrenchPersonalName[]> {
    const family = context?.family ?? await FrenchFamily.generate()
    const gender = data?.gender ?? selectRandomGender()

    const given = data?.personal ?? await drawStr(FrenchPersonalNameTables[gender], gender === 'Masculine' ? 'Jean' : 'Marie')
    const compoundOptions = FrenchPersonalName.getCompoundOptions(given)
    const personal = compoundOptions.length > 0 && chance(1, 2)
      ? `${given}-${selectRandomElement(compoundOptions)}`
      : given

    return [new FrenchPersonalName({ gender, personal }, { family })]
  }
}

export default FrenchPersonalName
