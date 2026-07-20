import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import EnglishPersonalName, { type EnglishPersonalNameData } from './english.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface IrishPersonalNameData extends PersonalNameData {
  family: string
}

export const IrishPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('FfWfEmYaVbJCx5i0'),
  Masculine: getRollTableUUID('QAewP1wCxn8LhvlP'),
  Surnames: getRollTableUUID('FIDGyWGEFEw1I5iW')
}

class IrishPersonalName extends PersonalName {
  family: string

  constructor (data?: Partial<IrishPersonalNameData>) {
    super(data)
    this.nationality = 'Irish'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Pádraig' : 'Brid')
    this.family = data?.family ?? 'Ó Murchadha'
    this.full = data?.full ?? `${this.personal} ${this.family}`
  }

  toObject (): IrishPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal,
      family: this.family
    }
  }

  static separateAnglicization (str: string): { gaelic: string, anglicization: string } {
    const match = str.match(/(.*?) \((.*?)\)/)
    const gaelic = match ? match[1] : str
    const anglicization = match ? match[2] : str
    return { gaelic, anglicization }
  }

  static async generate (
    data?: Partial<IrishPersonalNameData>
  ): Promise<[IrishPersonalName, EnglishPersonalName]> {
    const gender = data?.gender ?? selectRandomGender()
    const drawn = [
      await drawStr(IrishPersonalNameTables[gender], gender === 'Masculine' ? 'Pádraig' : 'Brid'),
      await drawStr(IrishPersonalNameTables.Surnames, 'Ó Murchadha')
    ].map(drawn => IrishPersonalName.separateAnglicization(drawn))

    const gaelic: Partial<IrishPersonalNameData> = {
      gender,
      personal: drawn[0].gaelic,
      family: drawn[1].gaelic
    }

    const anglicization: Partial<EnglishPersonalNameData> = {
      gender,
      personal: drawn[0].anglicization,
      family: drawn[1].anglicization
    }

    return [
      new IrishPersonalName(gaelic),
      new EnglishPersonalName(anglicization)
    ]
  }
}

export default IrishPersonalName
