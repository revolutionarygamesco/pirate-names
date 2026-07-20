import { describe, expect, it } from 'vitest'
import PatrilinealFamily from './patrilineal.ts'

describe('PatrilinealFamily', () => {
  describe('constructor', () => {
    it('creates a patrilineal family context instance', () => {
      const actual = new PatrilinealFamily()
      expect(actual).toBeInstanceOf(PatrilinealFamily)
    })

    it('can set the patriarch’s name', () => {
      const actual = new PatrilinealFamily({ patriarch: 'John' })
      expect(actual.patriarch).toBe('John')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data structure', () => {
        const instance = new PatrilinealFamily({ patriarch: 'John' })
        const actual = instance.toObject()
        expect(actual.patriarch).toBe('John')
      })
    })
  })
})
