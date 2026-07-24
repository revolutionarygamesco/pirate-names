import { chance, selectRandomElement } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import { type Nationality } from '../../types/enums/nationality.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'
import FrenchFamily, { FrenchFamilyNames, type FrenchFamilyData } from '../families/french.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams } from './base.ts'

export interface FrenchPersonalNameParams extends PersonalNameParams<BirthContextData<FrenchFamilyData>> {}
export interface FrenchPersonalNameData extends PersonalNameData<BirthContextData<FrenchFamilyData>> {}

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

class FrenchPersonalName extends PersonalName<FrenchFamily, BirthContext<FrenchFamily>> {
  protected static override nationality: Nationality = 'French'
  protected static override familyClass = FrenchFamily

  constructor (
    data?: Partial<FrenchPersonalNameParams>,
    context?: BirthContext<FrenchFamily>
  ) {
    super(data, context)
    this.personal = data?.personal ?? FrenchPersonalName.getDefaultPersonalName(this.gender)
  }

  get full (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Marie',
      Masculine: 'Jean'
    })
  }

  static getCompoundOptions (base: string): string[] {
    if (base in FrenchCompoundNames) return FrenchCompoundNames[base]
    return []
  }

  static async generate (
    data?: Partial<FrenchPersonalNameParams>,
    context?: BirthContext<FrenchFamily>
  ): Promise<FrenchPersonalName[]> {
    const birth = context ?? await FrenchPersonalName.generateBirth(data?.birth) as BirthContext<FrenchFamily>
    const gender = data?.gender ?? selectRandomGender()

    const given = data?.personal ?? await drawStr(
      FrenchPersonalNameTables[gender],
      FrenchPersonalName.getDefaultPersonalName(gender)
    )
    const compoundOptions = FrenchPersonalName.getCompoundOptions(given)
    const personal = compoundOptions.length > 0 && chance(1, 2)
      ? `${given}-${selectRandomElement(compoundOptions)}`
      : given

    return [new FrenchPersonalName({ gender, personal }, birth)]
  }
}

export default FrenchPersonalName
