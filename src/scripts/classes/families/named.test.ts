import { describe, expect, it } from 'vitest'
import NamedFamily from './named.ts'

describe('NamedFamily', () => {
  describe('constructor', () => {
    it('creates a named family context instance', () => {
      const actual = new NamedFamily()
      expect(actual).toBeInstanceOf(NamedFamily)
    })

    it('can set the family name', () => {
      const actual = new NamedFamily({ name: 'Smith' })
      expect(actual.name).toBe('Smith')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data structure', () => {
        const instance = new NamedFamily({ name: 'Smith' })
        const actual = instance.toObject()
        expect(actual.name).toBe('Smith')
      })
    })
  })
})
