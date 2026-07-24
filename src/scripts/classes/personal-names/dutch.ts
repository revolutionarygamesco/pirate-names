import { chance } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import { type Nationality } from '../../types/enums/nationality.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'
import generateDutchFamily, {
  DutchNameTables,
  NamedDutchFamily,
  PatrilinealDutchFamily,
  isNamedDutchFamilyData,
  isPatrilinealDutchFamilyData,
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
  protected static override nationality: Nationality = 'Dutch'

  constructor (
    data?: Partial<DutchPersonalNameParams>,
    context?: BirthContext<DutchFamily>
  ) {
    super(data, context)
    this.personal = data?.personal ?? DutchPersonalName.getDefaultPersonalName(this.gender)
  }

  protected override createFamily (data?: Partial<DutchFamilyData>): DutchFamily {
    if (isNamedDutchFamilyData(data)) return new NamedDutchFamily(data)
    if (isPatrilinealDutchFamilyData(data)) return new PatrilinealDutchFamily(data)
    if (chance(1, 2)) return new PatrilinealDutchFamily()
    return new NamedDutchFamily()
  }

  get lastName (): string {
    return this.family instanceof NamedDutchFamily
      ? this.family.name
      : this.family.renderPatronym(this.gender)
  }

  get full (): string {
    return `${this.personal} ${this.lastName}`
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

  protected static override async generateFamily (
    data?: Partial<DutchFamilyData>
  ): Promise<DutchFamily> {
    return await generateDutchFamily({ ...data, nationality: this.nationality })
  }

  static async generate (
    data?: Partial<DutchPersonalNameParams>,
    context?: BirthContext<DutchFamily>
  ): Promise<DutchPersonalName[]> {
    const family = context?.family ?? await DutchPersonalName.generateFamily(data?.birth?.family)
    const birth = context ?? await DutchPersonalName.generateBirth(data?.birth, family) as BirthContext<DutchFamily>
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(
      DutchPersonalNameTables[gender],
      DutchPersonalName.getDefaultPersonalName(gender)
    )
    return [new DutchPersonalName({ gender, personal }, birth)]
  }
}

export default DutchPersonalName
