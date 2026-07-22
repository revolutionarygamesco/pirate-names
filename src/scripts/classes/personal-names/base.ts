import { selectRandomElement } from '@revolutionarygamesco/common'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import { nationalities, type Nationality } from '../../types/enums/nationality.ts'
import Family, { type FamilyData } from '../families/base.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'

export interface PersonalNameData {
  gender: Gender
  nationality: Nationality,
  family: FamilyData,
  birth: BirthContextData,
  personal: string
  full: string
}

abstract class PersonalName {
  gender: Gender
  nationality: Nationality
  family: Family
  birth: BirthContext
  personal: string

  get full (): string {
    return this.personal
  }

  address (title: string): string {
    return `${title} ${this.personal}`
  }

  protected constructor (
    data?: Partial<PersonalNameData>,
    context?: Partial<{ family: Family, birth: BirthContext }>
  ) {
    this.gender = data?.gender ?? selectRandomGender()
    this.nationality = data?.nationality ?? selectRandomElement([...nationalities])
    this.family = context?.family ?? new Family(data?.family)
    this.birth = context?.birth ?? new BirthContext(data?.birth)
    this.personal = data?.personal ?? 'Personal'
  }

  toObject (): PersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      family: this.family.toObject(),
      birth: this.birth.toObject(),
      personal: this.personal,
      full: this.full
    }
  }
}

export default PersonalName
