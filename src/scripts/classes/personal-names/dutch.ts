import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'
import { type NamedFamilyData } from '../families/named.ts'
import generateDutchFamily, {
  DutchNameTables,
  NamedDutchFamily,
  PatrilinealDutchFamily,
  type DutchFamily,
  type DutchFamilyData
} from '../families/dutch.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams } from './base.ts'

export interface DutchPersonalNameParams extends PersonalNameParams<BirthContextData<DutchFamilyData>> {}
export interface DutchPersonalNameData extends PersonalNameData<BirthContextData<DutchFamilyData>> {}

export const DutchPersonalNameTables: Record<string, string> = {
  ...DutchNameTables,
  Feminine: getRollTableUUID('71DRh4LK1omoYTNV')
}

class DutchPersonalName extends PersonalName<DutchFamily, BirthContext<DutchFamily>> {
  constructor (
    data?: Partial<DutchPersonalNameParams>,
    context?: BirthContext<DutchFamily>
  ) {
    super(data, context)
    this.nationality = 'Dutch'
    const family = context?.family ?? this.initFamily(data?.birth?.family)
    this.birth = context ?? new BirthContext(data?.birth, family)
    this.personal = data?.personal ?? DutchPersonalName.getDefaultPersonalName(this.gender)
  }

  get lastName (): string {
    return this.family instanceof NamedDutchFamily
      ? this.family.name
      : this.family.renderPatronym(this.gender)
  }

  get full (): string {
    return `${this.personal} ${this.lastName}`
  }

  initFamily (family: DutchFamilyData | undefined): DutchFamily {
    if (family === undefined) return new NamedDutchFamily()
    if ((family as NamedFamilyData).name) return new NamedDutchFamily(family)
    return new PatrilinealDutchFamily(family)
  }

  address (title: string): string {
    return `${title} ${this.lastName}`
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Maria',
      Masculine: 'Jan'
    })
  }

  static async generate (
    data?: Partial<DutchPersonalNameParams>,
    context?: BirthContext<DutchFamily>
  ): Promise<DutchPersonalName[]> {
    const family = context?.family ?? await generateDutchFamily({ ...data?.birth?.family, nationality: 'Dutch' })
    const birth = context ?? new BirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(
      DutchPersonalNameTables[gender],
      DutchPersonalName.getDefaultPersonalName(gender)
    )
    return [new DutchPersonalName({ gender, personal }, birth)]
  }
}

export default DutchPersonalName
