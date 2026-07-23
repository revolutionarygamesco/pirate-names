import YorubaFamily, { type YorubaFamilyData } from '../families/yoruba.ts'
import BirthContext, { type BirthContextData } from './base.ts'

export interface YorubaBirthContextData extends BirthContextData<YorubaFamilyData> {}

class YorubaBirthContext extends BirthContext<YorubaFamily> {
  protected override get twinsPerK (): number {
    return 100
  }
}

export default YorubaBirthContext
