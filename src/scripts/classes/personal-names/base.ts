import { selectRandomElement } from '@revolutionarygamesco/common'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import { nationalities, type Nationality } from '../../types/enums/nationality.ts'
import Family from '../families/base.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'

export type TitleDict = Record<string, Record<Gender, string>>

interface PersonalNameCore<B extends BirthContextData = BirthContextData> {
  gender: Gender
  nationality: Nationality
  birth: B
}

export interface PersonalNameParams<B extends BirthContextData = BirthContextData> extends PersonalNameCore<B> {
  personal: string
}

export interface PersonalNameData<B extends BirthContextData = BirthContextData> extends PersonalNameCore<B> {
  forms: Record<string, string>
}

abstract class PersonalName<F extends Family = Family, B extends BirthContext<F> = BirthContext<F>> {
  gender: Gender
  nationality: Nationality
  birth: B
  personal: string

  protected constructor (
    data?: Partial<PersonalNameParams>,
    context?: B
  ) {
    this.gender = data?.gender ?? selectRandomGender()
    this.nationality = data?.nationality ?? selectRandomElement([...nationalities])
    this.birth = context ?? (new BirthContext(data?.birth) as B)
    this.personal = data?.personal ?? ''
  }

  get family (): F {
    return this.birth.family
  }

  get full (): string {
    return this.personal
  }

  address (title: string): string {
    return `${title} ${this.personal}`
  }

  toObject (titles: TitleDict = {}): PersonalNameData<ReturnType<B['toObject']>> {
    const forms: Record<string, string> = {}
    for (const key in titles) {
      const title = titles[key][this.gender]
      forms[key] = this.address(title)
    }

    return {
      nationality: this.nationality,
      gender: this.gender,
      birth: this.birth.toObject() as ReturnType<B['toObject']>,
      forms: {
        ...forms,
        personal: this.personal,
        full: this.full
      }
    }
  }

  static getDefaultPersonalName (gender: Gender, defaultNames: Record<Gender, string>) {
    return defaultNames[gender]
  }
}

export default PersonalName
