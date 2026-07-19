import { selectRandomGender, type Gender } from '../enums/gender.ts'

export interface NameData {
  gender: Gender
  full: string
  personal: string
  family?: string
}

class Name {
  gender: Gender
  full: string
  personal: string
  family: string

  constructor (data?: Partial<NameData>) {
    this.gender = data?.gender ?? selectRandomGender()
    const defaultPersonal = this.gender === 'Feminine' ? 'Jane' : 'John'

    this.personal = data?.personal ?? defaultPersonal
    this.family = data?.family ?? 'Doe'
    this.full = data?.full ?? `${this.personal} ${this.family}`
  }

  toObject (): NameData {
    return {
      gender: this.gender,
      full: this.full,
      personal: this.personal,
      family: this.family
    }
  }

  static load (data?: Partial<NameData>) {
    return new Name(data)
  }
}

export default Name
