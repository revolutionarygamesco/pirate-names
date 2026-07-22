import { describe, expect, it } from 'vitest'
import { igboWeekdays } from '../../types/enums/igbo-weekday.ts'
import IgboBirthContext from './igbo.ts'

describe('IgboBirthContext', () => {
  describe('constructor', () => {
    it('can set the day of the week', () => {
      const actual = new IgboBirthContext({ igboWeekday: 'Nkwo' })
      expect(actual.igboWeekday).toBe('Nkwo')
    })

    it('randomizes the weekday by default', () => {
      const actual = new IgboBirthContext()
      expect(igboWeekdays).toContain(actual.igboWeekday)
    })
  })
})
