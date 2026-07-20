import { selectRandomElement } from '@revolutionarygamesco/common'
import { selectRandomGender, type Gender } from '../../enums/gender.ts'
import { nationalities, type Nationality } from '../../enums/nationality.ts'

export interface PersonalNameData {
  gender: Gender
  nationality: Nationality
  full: string
  personal: string
}

abstract class PersonalName {
  gender: Gender
  nationality: Nationality
  full: string
  personal: string

  protected constructor (data?: Partial<PersonalNameData>) {
    this.gender = data?.gender ?? selectRandomGender()
    this.nationality = data?.nationality ?? selectRandomElement([...nationalities])
    this.personal = data?.personal ?? 'Personal'
    this.full = data?.full ?? 'Full'
  }

  toObject (): PersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal
    }
  }
}

export default PersonalName
