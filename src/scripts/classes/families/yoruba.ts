import Family, { type FamilyData } from './base.ts'

export interface YorubaFamilyData extends FamilyData {}

class YorubaFamily extends Family {
  constructor(data?: Partial<YorubaFamilyData>) {
    super(data)
    this.nationality = 'Yoruba'
  }
}

export default YorubaFamily
