import { describe, beforeEach, it, expect, vi } from 'vitest'
import { chance } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { givenNames, otherNames } from '../../../ids.ts'
import generateAbiso from './abiso.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  chance: vi.fn()
}))

const mockChance = vi.mocked(chance)

describe('generateAbiso', () => {
  beforeEach(() => {
    mockTables({
      [otherNames.Yoruba.Subjects.Animate.Masculine]: { results: [{ description: 'SubjAnMasc' } as foundry.documents.TableResult] },
      [otherNames.Yoruba.Subjects.Animate.Feminine]: { results: [{ description: 'SubjAnFem' } as foundry.documents.TableResult] },
      [otherNames.Yoruba.Subjects.Inanimate]: { results: [{ description: 'SubjIn' } as foundry.documents.TableResult] },
      [otherNames.Yoruba.Predicates.Core]: { results: [{ description: 'Pred' } as foundry.documents.TableResult] },
      [otherNames.Yoruba.Predicates.Animate]: { results: [{ description: 'Pred' } as foundry.documents.TableResult] },
      [givenNames.Yoruba.Masculine]: { results: [{ description: 'CommonMasc' } as foundry.documents.TableResult] },
      [givenNames.Yoruba.Feminine]: { results: [{ description: 'CommonFem' } as foundry.documents.TableResult] }
    })
  })

  it('sometimes returns a common name', async () => {
    mockChance.mockReturnValueOnce(true)
    const actual = await generateAbiso('Masculine')
    expect(actual).toBe('CommonMasc')
  })

  it('sometimes constructs an abiso name with an animate subject', async () => {
    mockChance.mockReturnValueOnce(false)
    mockChance.mockReturnValueOnce(true)
    const actual = await generateAbiso('Masculine')
    expect(actual).toBe('SubjAnMascPred')
  })

  it('sometimes constructs an abiso name with an inanimate subject', async () => {
    mockChance.mockReturnValueOnce(false)
    mockChance.mockReturnValueOnce(false)
    const actual = await generateAbiso('Masculine')
    expect(actual).toBe('SubjInPred')
  })
})
