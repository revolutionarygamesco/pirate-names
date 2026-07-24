import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import { type Nationality } from '../../types/enums/nationality.ts'
import Family, { type FamilyData } from '../families/base.ts'
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

  protected static nationality: Nationality = 'Spanish'
  protected static familyClass: typeof Family = Family

  protected constructor (
    data?: Partial<PersonalNameParams>,
    context?: B
  ) {
    const c = this.constructor as typeof PersonalName
    this.gender = data?.gender ?? selectRandomGender()
    this.nationality = c.nationality
    this.birth = context ?? this.createBirth(data?.birth)
    this.personal = data?.personal ?? ''
  }

  protected createFamily (data?: Partial<FamilyData>): F {
    const c = this.constructor as typeof PersonalName
    return new c.familyClass({ ...data, nationality: this.nationality }) as F
  }

  protected createBirth (data?: Partial<BirthContextData<FamilyData>>): B {
    return new BirthContext(data, this.createFamily(data?.family)) as B
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

  protected static async generateFamily (data?: Partial<FamilyData>): Promise<Family> {
    return await this.familyClass.generate({ ...data, nationality: this.nationality })
  }

  protected static async generateBirth (
    data?: Partial<BirthContextData<FamilyData>>,
    family?: Family
  ): Promise<BirthContext> {
    return new BirthContext(data, family ?? await this.generateFamily(data?.family))
  }
}

export default PersonalName
