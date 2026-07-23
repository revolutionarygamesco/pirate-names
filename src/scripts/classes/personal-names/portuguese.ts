import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'
import PortugueseFamily, { PortugueseFamilyNames, type PortugueseFamilyData } from '../families/portuguese.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams, type TitleDict } from './base.ts'

interface PortuguesePersonalNameCore {
  surnames: string
}

export interface PortuguesePersonalNameData extends PersonalNameData<BirthContextData<PortugueseFamilyData>>, PortuguesePersonalNameCore {}
export interface PortuguesePersonalNameParams extends PersonalNameParams<BirthContextData<PortugueseFamilyData>>, PortuguesePersonalNameCore {}

export const PortuguesePersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('sTahknOtK9nAiwNb'),
  Masculine: getRollTableUUID('iwH36PdS8m7nQKN6'),
  Surnames: PortugueseFamilyNames
}

class PortuguesePersonalName extends PersonalName<PortugueseFamily, BirthContext<PortugueseFamily>> {
  surnames: string

  constructor (
    data?: Partial<PortuguesePersonalNameParams>,
    context?: BirthContext<PortugueseFamily>
  ) {
    super(data, context)
    this.nationality = 'Portuguese'
    const family = context?.family ?? new PortugueseFamily({ ...data?.birth?.family, nationality: 'Portuguese' })
    this.birth = context ?? new BirthContext(data?.birth, family)
    this.personal = data?.personal ?? PortuguesePersonalName.getDefaultPersonalName(this.gender)
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

  toObject (titles: TitleDict = {}): PortuguesePersonalNameData {
    const obj = super.toObject(titles)
    obj.forms.short = this.short
    return {
      ...obj,
      surnames: this.surnames
    }
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Maria',
      Masculine: 'João'
    })
  }

  static async generate (
    data?: Partial<PortuguesePersonalNameParams>,
    context?: BirthContext<PortugueseFamily>
  ): Promise<PortuguesePersonalName[]> {
    const family = context?.family ?? await PortugueseFamily.generate({ ...data?.birth?.family, nationality: 'Portuguese' })
    const birth = context ?? new BirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()
    const personal = data?.personal ?? await drawStr(
      PortuguesePersonalNameTables[gender],
      PortuguesePersonalName.getDefaultPersonalName(gender)
    )
    const surnames = data?.surnames ?? family.createName()

    return [new PortuguesePersonalName({ gender, personal, surnames }, birth)]
  }
}

export default PortuguesePersonalName
