import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import ScottishFamily, { ScottishFamilyNames, type ScottishFamilyData } from '../families/scottish.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface ScottishPersonalNameData extends PersonalNameData {
  family: ScottishFamilyData
}

export const ScottishPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('GDuEJy7cl7KpUddS'),
  Masculine: getRollTableUUID('tBFnJ3lSQqtwAwTa'),
  Surnames: ScottishFamilyNames
}

class ScottishPersonalName extends PersonalName {
  family: ScottishFamily

  constructor (
    data?: Partial<ScottishPersonalNameData>,
    context?: Partial<{ family: ScottishFamily, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'Scottish'
    this.family = context?.family ?? new ScottishFamily(data?.family)
    this.birth = context?.birth ?? new BirthContext(data?.birth, this.family)
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'John' : 'Mary')
  }

  get full (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  toObject (): ScottishPersonalNameData {
    return {
      ...super.toObject(),
      family: this.family.toObject()
    }
  }

  static async generate (
    data?: Partial<ScottishPersonalNameData>,
    context?: Partial<{ family: ScottishFamily }>
  ): Promise<ScottishPersonalName[]> {
    const family = context?.family ?? await ScottishFamily.generate()
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(ScottishPersonalNameTables[gender], gender === 'Masculine' ? 'John' : 'Jane')
    return [new ScottishPersonalName({ gender, personal }, { family })]
  }
}

export default ScottishPersonalName
