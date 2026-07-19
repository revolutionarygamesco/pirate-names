import { selectRandomGender, type Gender } from '../../enums/gender.ts'

export interface PersonalNameData {
  gender: Gender
  full: string
  personal: string
}

abstract class PersonalName {
  gender: Gender
  full: string
  personal: string

  protected constructor (data?: Partial<PersonalNameData>) {
    this.gender = data?.gender ?? selectRandomGender()
    this.personal = data?.personal ?? 'Personal'
    this.full = data?.full ?? 'Full'
  }

  toObject (): PersonalNameData {
    return {
      gender: this.gender,
      full: this.full,
      personal: this.personal
    }
  }

  static async generate<T extends PersonalName>(
    this: new (data?: Partial<PersonalNameData>) => T
  ): Promise<T> {
    return new this()
  }

  static load<T extends PersonalName>(
    this: new (data?: Partial<PersonalNameData>) => T,
    data?: Partial<PersonalNameData>
  ): T {
    return new this(data)
  }
}

export default PersonalName
