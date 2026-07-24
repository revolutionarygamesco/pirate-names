import { chance, getObjectRecord, isString } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'
import PatrilinealFamily, { type PatrilinealFamilyData } from './patrilineal.ts'

export interface NamedDutchFamilyData extends NamedFamilyData {}
export interface PatrilineDutchFamilyData extends PatrilinealFamilyData {}
export type DutchFamilyData = NamedDutchFamilyData | PatrilineDutchFamilyData

export const isNamedDutchFamilyData = (
  candidate: unknown
): candidate is NamedDutchFamilyData => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return isString(obj.name)
}

export const isPatrilinealDutchFamilyData = (
  candidate: unknown
): candidate is PatrilineDutchFamilyData => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return isString(obj.patriarch)
}

export const DutchNameTables = {
  Masculine: getRollTableUUID('2uRlTQ7a2dthSDJ1'),
  Surnames: getRollTableUUID('txdQSSgEHJlW9Iax')
}

export class NamedDutchFamily extends NamedFamily {
  constructor(data?: Partial<NamedDutchFamilyData>) {
    super(data)
    this.nationality = 'Dutch'
    this.name = data?.name === undefined ? 'Smit' : this.name
  }

  static async generate (
    data?: Partial<NamedDutchFamilyData>
  ): Promise<NamedDutchFamily> {
    const name = data?.name ?? await drawStr(DutchNameTables.Surnames, 'Smit')
    return new NamedDutchFamily({ name, ...data })
  }
}

export class PatrilinealDutchFamily extends PatrilinealFamily {
  constructor(data?: Partial<PatrilineDutchFamilyData>) {
    super(data)
    this.nationality = 'Dutch'
    this.patriarch = data?.patriarch === undefined ? 'Jan' : this.patriarch
  }

  renderPatronym (gender: Gender): string {
    const suffix = gender === 'Feminine' ? 'dochter' : 'zoon'
    return `${this.patriarch}s${suffix}`
  }

  static async generate (
    data?: Partial<PatrilineDutchFamilyData>
  ): Promise<PatrilinealDutchFamily> {
    const patriarch = data?.patriarch ?? await drawStr(DutchNameTables.Masculine, 'Jan')
    return new PatrilinealDutchFamily({ patriarch, ...data })
  }
}

export type DutchFamily = NamedDutchFamily | PatrilinealDutchFamily

const generateDutchFamily = async (
  data?: Partial<DutchFamilyData>
): Promise<DutchFamily> => {
  const generator = chance(1, 2)
    ? NamedDutchFamily.generate
    : PatrilinealDutchFamily.generate
  return generator(data)
}

export default generateDutchFamily
