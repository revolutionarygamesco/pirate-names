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

  toObject (): PatrilinealFamilyData {
    return {
      ...super.toObject(),
      patriarch: this.patriarch
    }
  }
}

export default PatrilinealFamily
