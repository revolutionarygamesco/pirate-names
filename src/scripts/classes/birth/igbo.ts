import { selectRandomIgboWeekday, type IgboWeekday } from '../../types/enums/igbo-weekday.ts'
import IgboFamily from '../families/igbo.ts'
import BirthContext, { type BirthContextData } from './base.ts'

export interface IgboBirthContextData extends BirthContextData {
  igboWeekday: IgboWeekday
}

class IgboBirthContext extends BirthContext {
  igboWeekday: IgboWeekday

  constructor(
    data?: Partial<IgboBirthContextData>,
    family?: IgboFamily
  ) {
    if (data) {
      const { weekday, ...rest } = data
      super({ ...rest }, family)
    } else {
      super(data, family)
    }

    this.igboWeekday = data?.igboWeekday ?? selectRandomIgboWeekday()
  }

  toObject(): IgboBirthContextData {
    return {
      ...super.toObject(),
      igboWeekday: this.igboWeekday
    }
  }
}

export default IgboBirthContext
