import YorubaFamily, { type YorubaFamilyData } from '../families/yoruba.ts'
import { selectRandomTwinStatus } from '../../types/twin.ts'
import BirthContext, { type BirthContextData } from './base.ts'

export interface YorubaBirthContextData extends BirthContextData<YorubaFamilyData> {}

class YorubaBirthContext extends BirthContext<YorubaFamily> {
  constructor(
    data?: Partial<YorubaBirthContextData>,
    family?: YorubaFamily
  ) {
    super(data, family)
    if (data?.twin === undefined && this.family.size > 1) {
      this.twin = selectRandomTwinStatus(100)
    }
  }
}

export default YorubaBirthContext
