import { describe, beforeEach, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { otherNames } from '../../../ids.ts'
import generateWeekdayName from './weekday.ts'

describe('generateWeekdayName', () => {
  beforeEach(() => {
    mockTables({
      [otherNames.Igbo.WeekdayNames.Eke.Masculine]: { results: [{ description: 'Test' } as foundry.documents.TableResult] },
      [otherNames.Igbo.WeekdayNames.Oye.Masculine]: { results: [{ description: 'Test' } as foundry.documents.TableResult] },
      [otherNames.Igbo.WeekdayNames.Afor.Masculine]: { results: [{ description: 'Test' } as foundry.documents.TableResult] },
      [otherNames.Igbo.WeekdayNames.Nkwo.Masculine]: { results: [{ description: 'Test' } as foundry.documents.TableResult] }
    })
  })

  it('returns a weekday name', async () => {
    const actual = await generateWeekdayName('Masculine')
    expect(actual).toBe('Test')
  })
})
