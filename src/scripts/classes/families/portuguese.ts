import { chance, selectRandomBetween, dedupe } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'

export interface PortugueseFamilyData extends NamedFamilyData {
  other: {
    father: string
    mother: [string, string]
  }
}

export const PortugueseFamilyNames = getRollTableUUID('YnfyDSNUGMgycTHm')

class PortugueseFamily extends NamedFamily {
  other: { father: string, mother: [string, string] }

  constructor(data?: Partial<PortugueseFamilyData>) {
    super(data)
    this.nationality = 'Portuguese'
    this.name = this.name === 'Smith' ? 'Silva' : this.name
    this.other = data?.other ?? { father: 'Ferreira', mother: ['Pereira', 'Oliveira'] }
  }

  createName (): string {
    const useMother = selectRandomBetween(0, 2)
    const names = [this.name]
    if (chance(1, 2)) names.unshift(this.other.father)
    return dedupe([...this.other.mother.slice(2 - useMother), ...names]).join(' ')
  }

  toObject (): PortugueseFamilyData {
    return {
      ...super.toObject(),
      other: this.other
    }
  }

  static async generate (
    data?: Partial<PortugueseFamilyData>
  ): Promise<PortugueseFamily> {
    const name = data?.name ?? await drawStr(PortugueseFamilyNames, 'Silva')
    const father = data?.other?.father ?? await drawStr(PortugueseFamilyNames, 'Ferreira')
    const mother = data?.other?.mother ?? [
      await drawStr(PortugueseFamilyNames, 'Pereira'),
      await drawStr(PortugueseFamilyNames, 'Oliveira')
    ]
    return new PortugueseFamily({ name, other: { father, mother }, ...data })
  }
}

export default PortugueseFamily
