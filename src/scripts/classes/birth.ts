import { selectRandomWeekday, type Weekday } from '../enums/weekday.ts'
import selectRandomCircumstance from '../randomizers/circumstance.ts'

export interface BirthContextData {
  weekday: Weekday
  special: string | null
}

class BirthContext {
  weekday: Weekday
  special: string | null

  constructor(data?: Partial<BirthContextData>) {
    this.weekday = data?.weekday ?? selectRandomWeekday()
    this.special = data?.special ?? selectRandomCircumstance()
  }

  toObject (): BirthContextData {
    return {
      weekday: this.weekday,
      special: this.special
    }
  }

  static load (data?: Partial<BirthContextData>) {
    return new BirthContext(data)
  }
}

export default BirthContext
