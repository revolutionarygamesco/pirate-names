import { describe, beforeEach, it, expect, vi } from 'vitest'
import { chance } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { surnames } from '../../../ids.ts'
import generateSpanishSurname from './sur.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  chance: vi.fn()
}))

const mockChance = vi.mocked(chance)

describe('generateSpanishSurname', () => {
  beforeEach(() => {
    mockTables({
      [surnames.Spanish]: { results: [{ description: 'Rodriguez' } as foundry.documents.TableResult] }
    })
  })

  it('can return a single surname', async () => {
    mockChance.mockReturnValueOnce(true)
    const actual = await generateSpanishSurname()
    expect(actual).toBe('Rodriguez')
  })

  it('can return a compound surname', async () => {
    mockChance.mockReturnValueOnce(false)
    const actual = await generateSpanishSurname()
    expect(actual).toBe('Rodriguez-Rodriguez')
  })
})
