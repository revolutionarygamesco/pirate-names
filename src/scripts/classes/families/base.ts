import {
  selectRandomBetween,
  selectRandomBand,
  isNumber,
  chance
} from '@revolutionarygamesco/common'
import { type Nationality } from '../../enums/nationality.ts'

export interface FamilyData {
  nationality: Nationality
  size: number
  order: number
  twin: 1 | 2 | false
}

class Family {
  nationality: Nationality
  size: number
  order: number
  twin: 1 | 2 | false

  constructor (data?: Partial<FamilyData>) {
    this.nationality = data?.nationality ?? 'Spanish'
    this.size = data?.size ?? Family.selectRandomFamilySize()
    this.twin = data?.twin ?? false
    this.order = Math.min(data?.order ?? 1, this.size)

    if (this.twin) this.size = Math.max(this.size, 2)
    if (data?.order === undefined) this.randomizeBirthOrder(isNumber(this.twin) ? this.twin : 1)
  }

  get isLast (): boolean {
    return this.size === this.order
  }

  toObject (): FamilyData {
    return {
      nationality: this.nationality,
      size: this.size,
      order: this.order,
      twin: this.twin
    }
  }

  randomizeBirthOrder (min: number = 1) {
    const twinMin = isNumber(this.twin) ? Math.max(min, this.twin) : min
    this.order = selectRandomBetween(Math.min(twinMin, this.size), this.size)
  }

  randomizeTwinStatus (twinsPerK?: number) {
    if (twinsPerK === undefined) twinsPerK =  this.nationality === 'Yoruba' ? 100 : 60
    if (this.size < 2 || !chance(twinsPerK, 1000)) {
      this.twin = false
    } else {
      this.twin = selectRandomBetween(1, 2) as 1 | 2
    }
  }

  static selectRandomFamilySize () {
    return selectRandomBand<number>([
      { range: [1, 1], value: 1 },
      { range: [2, 3], value: 2 },
      { range: [4, 8], value: 3 },
      { range: [9, 16], value: 4 },
      { range: [17, 28], value: 5 },
      { range: [29, 42], value: 6 },
      { range: [43, 58], value: 7 },
      { range: [59, 71], value: 8 },
      { range: [72, 81], value: 9 },
      { range: [82, 89], value: 10 },
      { range: [90, 94], value: 11 },
      { range: [95, 98], value: 12 },
      { range: [99, 100], value: 13 }
    ]) ?? 1
  }
}

export default Family
