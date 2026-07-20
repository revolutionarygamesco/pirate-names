import { type Gender } from '../../enums/gender.ts'
import Family, { type FamilyData } from './base.ts'

export interface PatrilinealFamilyData extends FamilyData {
  patriarch: string
}

class PatrilinealFamily extends Family {
  patriarch: string

  constructor(data?: Partial<PatrilinealFamilyData>) {
    super(data)
    this.patriarch = data?.patriarch ?? 'John'
  }

  renderPatronym (gender: Gender) {
    const child = gender === 'Feminine' ? 'daughter' : 'son'
    return `${child} of ${this.patriarch}`
  }

  toObject (): PatrilinealFamilyData {
    return {
      ...super.toObject(),
      patriarch: this.patriarch
    }
  }
}

export default PatrilinealFamily
