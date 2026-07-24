import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import { type Nationality } from '../../types/enums/nationality.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams } from './base.ts'

export interface MiskitoPersonalNameParams extends PersonalNameParams {}
export interface MiskitoPersonalNameData extends PersonalNameData {}

export const MiskitoPersonalNameTables: Record<Gender, Record<'Subjects' | 'Modifiers', string>> = {
  Feminine: {
    Subjects: getRollTableUUID('qF2pSmn3cyD1do6N'),
    Modifiers: getRollTableUUID('AlsFFMJA3AhtCmda')
  },
  Masculine: {
    Subjects: getRollTableUUID('v6cVmbEDM57tkc6f'),
    Modifiers: getRollTableUUID('Pt5oS0ifCTYer0f2')
  }
}

class MiskitoPersonalName extends PersonalName {
  protected static override nationality: Nationality = 'Miskito'

  constructor (
    data?: Partial<MiskitoPersonalNameParams>,
    context?: BirthContext
  ) {
    super(data, context)
    this.personal = data?.personal ?? MiskitoPersonalName.getDefaultPersonalName(this.gender)
  }

  get full (): string {
    return this.personal
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Kati Pihni',
      Masculine: 'Lapta Tara'
    })
  }

  static async generate (
    data?: Partial<MiskitoPersonalNameParams>,
    context?: BirthContext
  ): Promise<MiskitoPersonalName[]> {
    const birth = context ?? await MiskitoPersonalName.generateBirth(data?.birth)
    const gender = data?.gender ?? selectRandomGender()
    if (data?.personal) return [new MiskitoPersonalName({ gender, personal: data.personal }, birth)]

    const subj = await drawStr(MiskitoPersonalNameTables[gender].Subjects, gender === 'Masculine' ? 'Lapta' : 'Kati')
    const mod = await drawStr(MiskitoPersonalNameTables[gender].Modifiers, gender === 'Masculine' ? 'Tara' : 'Pihni')
    const personal = `${subj} ${mod}`
    return [new MiskitoPersonalName({ gender, personal }, birth)]
  }
}

export default MiskitoPersonalName
