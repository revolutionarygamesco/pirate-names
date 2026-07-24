import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
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
    mockTables({ [getRollTableUUID('NLyKzSrJYnYaU6TJ')]: { results: [{ description: 'Spanish' } as foundry.documents.TableResult] } })
    expect(await selectRandomNationality()).toBe('Spanish')
  })
})
