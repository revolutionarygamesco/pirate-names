import FamilyContext, { type FamilyContextData } from './family.ts'
import BirthContext, { type BirthContextData } from './birth.ts'
import Name, { type NameData } from './name.ts'

export interface PersonData {
  family: FamilyContextData
  birth: BirthContextData
  names: NameData[]
  relationships: Array<{ description: string, person: PersonData }>
}

class Person {
  family: FamilyContext
  birth: BirthContext
  names: Name[]
  relationships: Array<{ description: string, person: Person }>

  constructor(data?: Partial<PersonData>) {
    this.family = new FamilyContext(data?.family)
    this.birth = new BirthContext(data?.birth)
    this.names = data?.names?.map(data => new Name(data)) ?? []
    this.relationships = data?.relationships?.map(r => {
      const { description, person } = r
      return { description, person: new Person(person) }
    }) ?? []
  }

  toObject (): PersonData {
    return {
      family: this.family.toObject(),
      birth: this.birth.toObject(),
      names: this.names.map(n => n.toObject()),
      relationships: this.relationships.map(({ description, person }) => {
        return { description, person: person.toObject() }
      })
    }
  }

  static load (data?: Partial<PersonData>) {
    return new Person(data)
  }
}

export default Person
