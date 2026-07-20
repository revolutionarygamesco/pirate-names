import Family, { type FamilyData } from './base.ts'

export interface NamedFamilyData extends FamilyData {
  name: string
}

class NamedFamily extends Family {
  name: string

  constructor(data?: Partial<NamedFamilyData>) {
    super(data)
    this.name = data?.name ?? 'Smith'
  }

  toObject (): NamedFamilyData {
    return {
      ...super.toObject(),
      name: this.name
    }
  }
}

export default NamedFamily
