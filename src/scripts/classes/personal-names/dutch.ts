import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import { type NamedFamilyData } from '../families/named.ts'
import generateDutchFamily, {
  DutchNameTables,
  NamedDutchFamily,
  PatrilinealDutchFamily,
  type DutchFamily,
  type DutchFamilyData
} from '../families/dutch.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface DutchPersonalNameData extends PersonalNameData {
  family: DutchFamilyData
}

export const DutchPersonalNameTables: Record<string, string> = {
  ...DutchNameTables,
  Feminine: getRollTableUUID('71DRh4LK1omoYTNV')
}

class DutchPersonalName extends PersonalName {
  family: DutchFamily

  constructor (
    data?: Partial<DutchPersonalNameData>,
    context?: Partial<{ family: DutchFamily, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'Dutch'
    this.family = context?.family ?? this.initFamily(data?.family)
    this.birth = context?.birth ?? new BirthContext(data?.birth, this.family)
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Jan' : 'Maria')
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

  toObject (): DutchPersonalNameData {
    return {
      ...super.toObject(),
      family: this.family.toObject()
    }
  }

  static async generate (
    data?: Partial<DutchPersonalNameData>,
    context?: Partial<{ family: DutchFamily, birth: BirthContext }>
  ): Promise<DutchPersonalName[]> {
    const family = context?.family ?? await generateDutchFamily()
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(DutchPersonalNameTables[gender], gender === 'Masculine' ? 'Jan' : 'Maria')
    return [new DutchPersonalName({ gender, personal }, { family })]
  }
}

export default DutchPersonalName
