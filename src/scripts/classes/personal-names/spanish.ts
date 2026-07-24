import { chance, selectRandomElement } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import { type Nationality } from '../../types/enums/nationality.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'
import SpanishFamily, { SpanishFamilyNames, type SpanishFamilyData } from '../families/spanish.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams, type TitleDict } from './base.ts'

export interface SpanishPersonalNameParams extends PersonalNameParams<BirthContextData<SpanishFamilyData>> {}
export interface SpanishPersonalNameData extends PersonalNameData<BirthContextData<SpanishFamilyData>> {}

export const SpanishPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('7RbOJKmELYZF6aX7'),
  Masculine: getRollTableUUID('2nlXu7X2BWOsp7oi'),
  Surnames: SpanishFamilyNames
}

export const SpanishCompoundNames: Record<string, string[]> = {
  Andrés: ['Felipe', 'Martin'],
  Carlos: ['Alberto', 'Guillermo'],
  Diego: ['Alejandro', 'Antonio'],
  José: ['Alejandro', 'Andrés', 'Francisco', 'Luis', 'Manuel', 'Miguel',
    'Pablo'],
  Juan: ['Andrés', 'Camilo', 'Carlos', 'Cruz', 'Diego', 'Esteban', 'Felipe',
    'Ignacio', 'José', 'Manuel', 'Martín', 'Pablo', 'Sebastián'],
  Luis: ['Alberto', 'Alfonso', 'Antonio', 'Armando', 'Enrique', 'Fernando'],
  Ana: ['Karina', 'Lucia', 'María', 'Paula', 'Rafaela', 'Sofía', 'Victoria'],
  María: ['Antonia', 'Camila', 'Elena', 'Eugenia', 'Fernanda', 'Gracia',
    'Isabel', 'José', 'Luisa', 'Luna', 'Mercedes', 'Paula', 'Valentina']
}

class SpanishPersonalName extends PersonalName<SpanishFamily, BirthContext<SpanishFamily>> {
  protected static override nationality: Nationality = 'Spanish'
  protected static override familyClass = SpanishFamily

  constructor (
    data?: Partial<SpanishPersonalNameParams>,
    context?: BirthContext<SpanishFamily>
  ) {
    super(data, context)
    this.personal = data?.personal ?? SpanishPersonalName.getDefaultPersonalName(this.gender)
  }

  get full (): string {
    return `${this.personal} ${this.family.full}`
  }

  get short (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  toObject (titles: TitleDict = {}): SpanishPersonalNameData {
    const obj = super.toObject(titles)
    obj.forms.short = this.short
    return obj
  }

  static getCompoundOptions (base: string): string[] {
    if (base in SpanishCompoundNames) return SpanishCompoundNames[base]
    return []
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'María',
      Masculine: 'Juan'
    })
  }

  static async generate (
    data?: Partial<SpanishPersonalNameParams>,
    context?: BirthContext<SpanishFamily>
  ): Promise<SpanishPersonalName[]> {
    const birth = context ?? await SpanishPersonalName.generateBirth(data?.birth) as BirthContext<SpanishFamily>
    const gender = data?.gender ?? selectRandomGender()

    const given = data?.personal ?? await drawStr(
      SpanishPersonalNameTables[gender],
      SpanishPersonalName.getDefaultPersonalName(gender)
    )

    const compoundOptions = SpanishPersonalName.getCompoundOptions(given)
    const personal = compoundOptions.length > 0 && chance(1, 2)
      ? `${given} ${selectRandomElement(compoundOptions)}`
      : given

    return [new SpanishPersonalName({ gender, personal }, birth)]
  }
}

export default SpanishPersonalName
