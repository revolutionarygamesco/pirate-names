import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import PortugueseFamily, { PortugueseFamilyNames, type PortugueseFamilyData } from '../families/portuguese.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface PortuguesePersonalNameData extends PersonalNameData {
  family: PortugueseFamilyData
  short: string
  surnames: string
}

export const PortuguesePersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('sTahknOtK9nAiwNb'),
  Masculine: getRollTableUUID('iwH36PdS8m7nQKN6'),
  Surnames: PortugueseFamilyNames
}

class PortuguesePersonalName extends PersonalName {
  family: PortugueseFamily
  surnames: string

  constructor (
    data?: Partial<PortuguesePersonalNameData>,
    context?: Partial<{ family: PortugueseFamily, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'Portuguese'
    this.family = context?.family ?? new PortugueseFamily(data?.family)
    this.birth = context?.birth ?? new BirthContext(data?.birth, this.family)
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'João' : 'Maria')
    this.surnames = data?.surnames ?? this.family.createName()
  }

  get full (): string {
    return `${this.personal} ${this.surnames}`
  }

  get short (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  toObject (): PortuguesePersonalNameData {
    return {
      ...super.toObject(),
      family: this.family.toObject(),
      surnames: this.surnames,
      short: this.short
    }
  }

  static async generate (
    data?: Partial<PortuguesePersonalNameData>,
    context?: Partial<{ family: PortugueseFamily, birth: BirthContext }>
  ): Promise<PortuguesePersonalName[]> {
    const family = context?.family ?? await PortugueseFamily.generate()
    const birth = context?.birth ?? new BirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()
    const personal = data?.personal ?? await drawStr(PortuguesePersonalNameTables[gender], gender === 'Masculine' ? 'João' : 'Maria')
    const surnames = data?.surnames ?? family.createName()

    return [new PortuguesePersonalName({ gender, personal, surnames }, { family, birth })]
  }
}

export default PortuguesePersonalName
