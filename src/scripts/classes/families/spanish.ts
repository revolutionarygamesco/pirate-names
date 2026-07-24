import { selectRandomBetween, selectRandomElement, dedupe } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import {
  selectRandomSpanishSurnameConjunction,
  type SpanishSurnameConjunction
} from '../../types/enums/ssconj.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'

export interface SpanishFamilyData extends NamedFamilyData {
  full: string
}

export interface SpanishSurname {
  names: string[]
  conj: SpanishSurnameConjunction
}

export const SpanishFamilyNames = getRollTableUUID('zWWy0a2DiYQ9bdqe')

class SpanishFamily extends NamedFamily {
  full: string

  constructor(data?: Partial<SpanishFamilyData>) {
    super(data)
    this.nationality = 'Spanish'
    this.name = data?.name === undefined ? 'Rodriguez' : this.name
    this.full = data?.full ?? this.name
  }

  toObject (): SpanishFamilyData {
    return {
      ...super.toObject(),
      full: this.full
    }
  }

  static renderSurname (surname: SpanishSurname): string {
    const { names, conj } = surname
    if (names.length < 2) return names[0]
    const sep = conj === '-' ? '-' : ` ${conj} `
    return names.join(sep)
  }

  static async drawSurname (): Promise<string> {
    return await drawStr(SpanishFamilyNames, 'Rodriguez')
  }

  static async generateSurname (): Promise<SpanishSurname> {
    const conj = selectRandomSpanishSurnameConjunction()
    const n = selectRandomBetween(1, 2)
    const names: string[] = []
    for (let i = 0; i < n; i++) {
      names.push(await SpanishFamily.drawSurname())
    }
    return { names: dedupe(names), conj }
  }

  static async generate (
    data?: Partial<SpanishFamilyData>
  ): Promise<SpanishFamily> {
    const father = await SpanishFamily.generateSurname()
    const mother = await SpanishFamily.generateSurname()
    const name = father.names[0]
    const f = SpanishFamily.renderSurname(father)
    const m = SpanishFamily.renderSurname(mother)
    const full = f === m ? f : selectRandomElement([
      `${SpanishFamily.renderSurname(father)} ${SpanishFamily.renderSurname(mother)}`,
      `${SpanishFamily.renderSurname(father)} y ${SpanishFamily.renderSurname(mother)}`,
      `${SpanishFamily.renderSurname(father)} e ${SpanishFamily.renderSurname(mother)}`,
      `${SpanishFamily.renderSurname(father)} de ${SpanishFamily.renderSurname(mother)}`
    ])
    return new SpanishFamily({ ...data, name, full })
  }
}

export default SpanishFamily
