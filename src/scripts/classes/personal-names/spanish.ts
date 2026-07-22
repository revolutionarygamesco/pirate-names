import { chance, selectRandomElement } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import SpanishFamily, { SpanishFamilyNames, type SpanishFamilyData } from '../families/spanish.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface SpanishPersonalNameData extends PersonalNameData {
  family: SpanishFamilyData
  short: string
}

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

class SpanishPersonalName extends PersonalName {
  family: SpanishFamily

  constructor (
    data?: Partial<SpanishPersonalNameData>,
    context?: Partial<{ family: SpanishFamily, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'Spanish'
    this.family = context?.family ?? new SpanishFamily(data?.family)
    this.birth = context?.birth ?? new BirthContext(data?.birth, this.family)
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Juan' : 'María')
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

  toObject (): SpanishPersonalNameData {
    return {
      ...super.toObject(),
      family: this.family.toObject(),
      short: this.short
    }
  }

  static getCompoundOptions (base: string): string[] {
    if (base in SpanishCompoundNames) return SpanishCompoundNames[base]
    return []
  }

  static async generate (
    data?: Partial<SpanishPersonalNameData>,
    context?: Partial<{ family: SpanishFamily }>
  ): Promise<SpanishPersonalName[]> {
    const family = context?.family ?? await SpanishFamily.generate()
    const gender = data?.gender ?? selectRandomGender()

    const given = data?.personal ?? await drawStr(SpanishPersonalNameTables[gender], gender === 'Masculine' ? 'Jean' : 'Marie')
    const compoundOptions = SpanishPersonalName.getCompoundOptions(given)
    const personal = compoundOptions.length > 0 && chance(1, 2)
      ? `${given} ${selectRandomElement(compoundOptions)}`
      : given

    return [new SpanishPersonalName({ gender, personal }, { family })]
  }
}

export default SpanishPersonalName
