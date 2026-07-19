import { describe, beforeEach, it, expect, vi } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { surnames } from '../../../ids.ts'
import generateFullSpanishSurname from './full-sur.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  chance: () => true
}))

describe('generateFullSpanishSurname', () => {
  beforeEach(() => {
    mockTables({
      [surnames.Spanish]: { results: [{ description: 'Rodriguez' } as foundry.documents.TableResult] }
    })
  })

  it('returns a full surname', async () => {
    const actual = await generateFullSpanishSurname()
    expect(actual).toBe('Rodriguez y Rodriguez')
  })
})
