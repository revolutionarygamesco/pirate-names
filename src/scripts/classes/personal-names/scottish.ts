import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { type Gender, selectRandomGender } from '../../types/enums/gender.ts'
import { type Nationality } from '../../types/enums/nationality.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'
import ScottishFamily, { ScottishFamilyNames, type ScottishFamilyData } from '../families/scottish.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams } from './base.ts'

export interface ScottishPersonalNameParams extends PersonalNameParams<BirthContextData<ScottishFamilyData>> {}
export interface ScottishPersonalNameData extends PersonalNameData<BirthContextData<ScottishFamilyData>> {}

export const ScottishPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('GDuEJy7cl7KpUddS'),
  Masculine: getRollTableUUID('tBFnJ3lSQqtwAwTa'),
  Surnames: ScottishFamilyNames
}

class ScottishPersonalName extends PersonalName<ScottishFamily, BirthContext<ScottishFamily>> {
  protected static override nationality: Nationality = 'Scottish'
  protected static override familyClass = ScottishFamily

  constructor (
    data?: Partial<ScottishPersonalNameParams>,
    context?: BirthContext<ScottishFamily>
  ) {
    super(data, context)
    this.personal = data?.personal ?? ScottishPersonalName.getDefaultPersonalName(this.gender)
  }

  get full (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Mary',
      Masculine: 'John'
    })
  }

  static async generate (
    data?: Partial<ScottishPersonalNameParams>,
    context?: BirthContext<ScottishFamily>
  ): Promise<ScottishPersonalName[]> {
    const birth = context ?? await ScottishPersonalName.generateBirth(data?.birth) as BirthContext<ScottishFamily>
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(
      ScottishPersonalNameTables[gender],
      ScottishPersonalName.getDefaultPersonalName(gender)
    )
    return [new ScottishPersonalName({ gender, personal }, birth)]
  }
}

export default ScottishPersonalName
