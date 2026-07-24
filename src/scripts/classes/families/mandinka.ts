import { selectRandomVariation } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import { selectRandomMandinkaCaste, type MandinkaCaste } from '../../types/enums/mandinka-caste.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'

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
    this.name = data?.name === undefined ? 'Trawally' : this.name
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
    const name = selectRandomVariation(data?.name ?? await drawStr(Jamu[caste], 'Trawally'))
    return new MandinkaFamily({ ...data, name, caste })
  }
}

export default MandinkaFamily
