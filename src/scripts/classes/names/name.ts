import { selectRandomGender, type Gender } from '../../enums/gender.ts'

export interface BaseNameData {
  gender: Gender
  full: string
  personal: string
}

abstract class BaseName {
  gender: Gender
  full: string
  personal: string

  protected constructor (data?: Partial<BaseNameData>) {
    this.gender = data?.gender ?? selectRandomGender()
    this.personal = data?.personal ?? 'Personal'
    this.full = data?.full ?? 'Full'
  }

  toObject (): BaseNameData {
    return {
      gender: this.gender,
      full: this.full,
      personal: this.personal
    }
  }

  static async generate<T extends BaseName>(
    this: new (data?: Partial<BaseNameData>) => T
  ): Promise<T> {
    return new this()
  }

  static load<T extends BaseName>(
    this: new (data?: Partial<BaseNameData>) => T,
    data?: Partial<BaseNameData>
  ): T {
    return new this(data)
  }
}

export default BaseName
