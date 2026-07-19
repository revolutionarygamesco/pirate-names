import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { describe, beforeEach, it, expect } from 'vitest'
import { givenNames } from '../../../ids.ts'
import generateDutchPatronym from './patronym.ts'

describe('check', () => {
  beforeEach(() => {
    mockTables({
      [givenNames.Dutch.Masculine]: { results: [{ description: 'Jan' } as foundry.documents.TableResult] }
    })
  })

  it('returns a patronym for a son', async () => {
    const actual = await generateDutchPatronym('Masculine')
    expect(actual).toBe('Janszoon')
  })

  it('returns a patronym for a daughter', async () => {
    const actual = await generateDutchPatronym('Feminine')
    expect(actual).toBe('Jansdochter')
  })
})
