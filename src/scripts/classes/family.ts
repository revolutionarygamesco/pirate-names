import { selectRandomBetween, selectRandomBand, isNumber } from '@revolutionarygamesco/common'
import selectRandomTwinStatus from '../randomizers/twin.ts'

export interface FamilyContextData {
  size: number
  order: number
  twin: 1 | 2 | false
}

class FamilyContext {
  size: number
  order: number
  twin: 1 | 2 | false

  constructor (data?: Partial<FamilyContextData>) {
    this.size = data?.size ?? FamilyContext.selectRandomFamilySize()
    this.twin = data?.twin ?? selectRandomTwinStatus()
    this.order = Math.min(data?.order ?? 1, this.size)

    if (this.twin) this.size = Math.max(this.size, 2)
    if (data?.order === undefined) this.randomizeBirthOrder(isNumber(this.twin) ? this.twin : 1)
  }

  get isLast (): boolean {
    return this.size === this.order
  }

  toObject (): FamilyContextData {
    return {
      size: this.size,
      order: this.order,
      twin: this.twin
    }
  }

  randomizeBirthOrder (min: number = 1) {
    this.order = selectRandomBetween(Math.min(min, this.size), this.size)
  }

  static load (data?: Partial<FamilyContextData>) {
    return new FamilyContext(data)
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

export default FamilyContext
