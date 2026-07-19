type NationScope = 'person' | 'pirate' | 'ship'

interface RollTableResult {
  type?: string
  img?: string
  name?: string
  description?: string
}

interface RollTableOptions {
  displayChat?: boolean
  recursive?: boolean
  results?: any
  roll?: any
  rollMode?: string
}

interface GenerateShipNameOptions {
  colors?: Colors
  martial?: boolean
  whisper?: string[]
}

interface SpanishShipName {
  religious: string
  secular: string
}

interface BirthCircumstances {
  weekday: Weekday
  order: number | 'last'
  twin: 1 | 2 | false
  special: string
  caste: string
}

interface Relation {
  relationship: string
  person: Person
}

interface Person {
  born: Partial<BirthCircumstances>
  nationality: Nationality
  gender: Gender
  name: {
    full: string
    personal: string
    family?: string
  }
  relations: Relation[]
}
