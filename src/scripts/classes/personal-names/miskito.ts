import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import Family from '../families/base.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

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
  constructor (
    data?: Partial<PersonalNameData>,
    context?: Partial<{ family: Family, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'Miskito'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Lapta Tara' : 'Kati Pihni')
  }

  get full (): string {
    return this.personal
  }

  static async generate (
    data?: Partial<PersonalNameData>
  ): Promise<MiskitoPersonalName[]> {
    const gender = data?.gender ?? selectRandomGender()
    if (data?.personal) return [new MiskitoPersonalName({ gender, personal: data.personal, full: data?.full ?? data.personal })]

    const subj = await drawStr(MiskitoPersonalNameTables[gender].Subjects, gender === 'Masculine' ? 'Lapta' : 'Kati')
    const mod = await drawStr(MiskitoPersonalNameTables[gender].Modifiers, gender === 'Masculine' ? 'Tara' : 'Pihni')
    const personal = `${subj} ${mod}`
    return [new MiskitoPersonalName({ gender, personal, full: personal })]
  }
}

export default MiskitoPersonalName
