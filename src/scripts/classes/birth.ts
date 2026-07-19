import { stockArray, selectRandomElement, isString } from '@revolutionarygamesco/common'
import { selectRandomWeekday, type Weekday } from '../enums/weekday.ts'

export interface BirthContextData {
  weekday: Weekday
  special: string | null
}

class BirthContext {
  weekday: Weekday
  special: string | null

  constructor(data?: Partial<BirthContextData>) {
    this.weekday = data?.weekday ?? selectRandomWeekday()

    const givenSpecial = isString(data?.special) || data?.special === null
    if (givenSpecial) {
      this.special = data.special as string | null
    } else {
      this.special = null
      this.randomizeCircumstance()
    }
  }

  toObject (): BirthContextData {
    return {
      weekday: this.weekday,
      special: this.special
    }
  }

  randomizeCircumstance (): void {
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

    this.special = drawn === '' ? null : drawn
  }

  static load (data?: Partial<BirthContextData>) {
    return new BirthContext(data)
  }
}

export default BirthContext
