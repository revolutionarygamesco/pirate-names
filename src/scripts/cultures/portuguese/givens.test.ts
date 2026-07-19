import { describe, beforeEach, it, expect } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { givenNames } from '../../../ids.ts'
import generatePortugueseGivenNames from './givens.ts'

describe('check', () => {
  beforeEach(() => {
    mockTables({
      [givenNames.Portuguese.Feminine]: { results: [{ description: 'Maria' } as foundry.documents.TableResult] }
    })
  })

  it('returns an array of given names', async () => {
    const actual = await generatePortugueseGivenNames('Feminine')
    expect(actual[0]).toBe('Maria')
  })

  it('returns 1-2 given names', async () => {
    const actual = await generatePortugueseGivenNames('Feminine')
    expect(isWithinRange(actual.length, [1, 2])).toBe(true)
  })
})
