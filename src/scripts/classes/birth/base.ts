import {
  stockArray,
  selectRandomElement,
  isString,
  selectRandomBetween
} from '@revolutionarygamesco/common'
import { selectRandomWeekday, type Weekday } from '../../types/enums/weekday.ts'
import { selectRandomTwinStatus, type TwinStatus } from '../../types/twin.ts'
import Family, { type FamilyData } from '../families/base.ts'

export interface BirthContextData {
  family: FamilyData
  order: number
  twin: TwinStatus
  weekday: Weekday
  special: string | null
}

class BirthContext {
  family: Family
  order: number
  twin: TwinStatus
  weekday: Weekday
  special: string | null

  constructor(
    data?: Partial<BirthContextData>,
    family?: Family
  ) {
    this.family = family ?? new Family(data?.family)
    if (this.family.size < 2) {
      this.twin = false
    } else {
      this.twin = data?.twin ?? selectRandomTwinStatus(this.family.nationality === 'Yoruba' ? 100 : 60)
    }

    this.order = data?.order ?? selectRandomBetween(1, this.family.size)
    if (this.twin === 1) this.order = Math.min(this.order, this.family.size - 1)
    if (this.twin === 2) this.order = Math.max(this.order, 2)

    this.weekday = data?.weekday ?? selectRandomWeekday()
    this.special = isString(data?.special) || data?.special === null
      ? data.special
      : BirthContext.selectRandomCircumstance()
  }

  get last (): boolean {
    return this.order === this.family.size
  }

  toObject (): BirthContextData {
    return {
      family: this.family.toObject(),
      order: this.order,
      twin: this.twin,
      weekday: this.weekday,
      special: this.special
    }
  }

  static selectRandomCircumstance (): string | null {
    const drawn = selectRandomElement(stockArray<string>([
      { n: 15, item: 'sickly'},
      { n: 15, item: 'field' },
      { n: 15, item: 'war' },
      { n: 15, item: 'road' },
      { n: 15, item: 'fatherless' },
      { n: 15, item: 'happy' },
      { n: 15, item: 'loves' },
      { n: 5, item: 'great' },
      { n: 10, item: 'forceful' },
      { n: 15, item: 'dry' },
      { n: 5, item: 'water' },
      { n: 15, item: 'conflict' },
      { n: 15, item: 'market' },
      { n: 15, item: 'facedown' },
      { n: 15, item: 'day' },
      { n: 15, item: 'night' },
      { n: 5, item: 'postterm' },
      { n: 5, item: 'caul' },
      { n: 5, item: 'motherless' },
      { n: 10, item: 'crier' },
      { n: 5, item: 'breech' },
      { n: 5, item: 'knotted' },
      { n: 5, item: 'unbroken' },
      { n: 5, item: 'festival' },
      { n: 1, item: 'egungun' },
      { n: 1, item: 'orisa' },
      { n: 5, item: 'traveling' },
      { n: 5, item: 'overseas' },
      { n: 250, item: '' }
    ]))

    return drawn === '' ? null : drawn
  }
}

export default BirthContext
