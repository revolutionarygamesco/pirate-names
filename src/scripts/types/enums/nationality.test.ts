import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { nation } from '../../../ids.ts'
import {
  isNationality,
  selectRandomNationality,
  nationalities,
  type Nationality
} from './nationality.ts'


describe('isNationality', () => {
  it.each(primitives)('rejects %s', (_desc: string, candidate: any) => {
    expect(isNationality(candidate)).toBe(false)
  })

  it.each(nationalities)('accepts %s', (nationality: Nationality) => {
    expect(isNationality(nationality)).toBe(true)
  })
})

describe('selectRandomNationality', () => {
  it('picks a nationality', async () => {
    mockTables({ [nation.person]: { results: [{ description: 'Spanish' } as foundry.documents.TableResult] } })
    expect(await selectRandomNationality()).toBe('Spanish')
  })
})
