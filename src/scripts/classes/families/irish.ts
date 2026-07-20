import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import separateParenthetical from '../../parenthetical.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'

export const IrishFamilyNames = getRollTableUUID('FIDGyWGEFEw1I5iW')

export interface IrishFamilyData extends NamedFamilyData {
  anglicization: string
}

class IrishFamily extends NamedFamily {
  anglicization: string

  constructor(data?: Partial<IrishFamilyData>) {
    super(data)
    this.nationality = 'Irish'
    this.name = this.name === 'Smith' ? 'Ó Murchadha' : this.name
    this.anglicization = data?.anglicization ?? (this.name === 'Ó Murchadha' ? 'Murphy' : '')
  }

  toObject (): IrishFamilyData {
    return {
      ...super.toObject(),
      anglicization: this.anglicization
    }
  }

  static async generate (
    data?: Partial<IrishFamilyData>
  ): Promise<IrishFamily> {
    const drawn = data?.name ?? await drawStr(IrishFamilyNames, 'Ó Murchadha (Murphy)')
    const { regular: name, parenthetical: anglicization } = separateParenthetical(drawn)
    return new IrishFamily({ name, anglicization, ...data })
  }
}

export default IrishFamily
