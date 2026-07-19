import { describe, beforeEach, it, expect } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { surnames } from '../../../ids.ts'
import generatePortugueseSurames from './surs.ts'

describe('check', () => {
  beforeEach(() => {
    mockTables({
      [surnames.Portuguese]: { results: [{ description: 'Silva' } as foundry.documents.TableResult] }
    })
  })

  it('returns Portuguese surnames', async () => {
    const actual = await generatePortugueseSurames()
    expect(actual[0]).toBe('Silva')
  })

  it('returns 1-4 surnames', async () => {
    const actual = await generatePortugueseSurames()
    expect(isWithinRange(actual.length, [1, 4])).toBe(true)
  })
})
