import selectRandomFamilySize from '../randomizers/family.ts'
import selectRandomBirthOrder from '../randomizers/birth-order.ts'
import selectRandomTwinStatus from '../randomizers/twin.ts'
import { selectRandomMandinkaCaste, type MandinkaCaste } from '../cultures/mandinka/caste.ts'

export interface FamilyContextData {
  size: number
  order: number
  twin: 1 | 2 | false
  caste: MandinkaCaste
}

class FamilyContext {
  size: number
  order: number
  twin: 1 | 2 | false
  caste: MandinkaCaste

  constructor (data?: Partial<FamilyContextData>) {
    this.size = data?.size ?? selectRandomFamilySize()
    this.order = data?.order ?? selectRandomBirthOrder()
    this.twin = data?.twin ?? selectRandomTwinStatus()
    this.caste = data?.caste ?? selectRandomMandinkaCaste()

    if (this.twin) this.size = Math.max(this.size, 2)
    this.order = Math.min(this.order, this.size)
  }

  get isLast (): boolean {
    return this.size === this.order
  }

  toObject (): FamilyContextData {
    return {
      size: this.size,
      order: this.order,
      twin: this.twin,
      caste: this.caste
    }
  }

  static load (data?: Partial<FamilyContextData>) {
    return new FamilyContext(data)
  }
}

export default FamilyContext
