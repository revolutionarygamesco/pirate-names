import { makeEnum, stockArray, selectRandomElement } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'

export const mandinkaCastes = ['Foro', 'Nyamakala', 'Jali', 'Jakhanke'] as const
export type MandinkaCaste = typeof mandinkaCastes[number]
export const { guard: isMandinkaCaste } = makeEnum(mandinkaCastes)
export const selectRandomMandinkaCaste = (): MandinkaCaste => {
  return selectRandomElement(stockArray<MandinkaCaste>([
    { n: 1, item: 'Jali' },
    { n: 1, item: 'Jakhanke' },
    { n: 1, item: 'Nyamakala' },
    { n: 97, item: 'Foro' }
  ]))
}

export const Jamu: Record<MandinkaCaste, string> = {
  Jali: getRollTableUUID('93b5JWBYXzygjAtO'),
  Jakhanke: getRollTableUUID('6pJpyB88zpiBTjWP'),
  Nyamakala: getRollTableUUID('AqC4WfHPOUpmsQ63'),
  Foro: getRollTableUUID('Oj7Bc5DBCsBNxZF6')
}

export interface MandinkaFamilyData extends NamedFamilyData {
  caste: MandinkaCaste
}

class MandinkaFamily extends NamedFamily {
  caste: MandinkaCaste

  constructor(data?: Partial<MandinkaFamilyData>) {
    super(data)
    this.nationality = 'Mandinka'
    this.caste = data?.caste ?? 'Foro'
    this.name = this.name === 'Smith' ? 'Trawally' : this.name
  }

  toObject (): MandinkaFamilyData {
    return {
      ...super.toObject(),
      caste: this.caste
    }
  }

  static async generate (
    data?: Partial<MandinkaFamilyData>
  ): Promise<MandinkaFamily> {
    const caste = data?.caste ?? selectRandomMandinkaCaste()
    const name = data?.name ?? await drawStr(Jamu[caste], 'Trawally')
    return new MandinkaFamily({ name, caste, ...data })
  }
}

export default MandinkaFamily
