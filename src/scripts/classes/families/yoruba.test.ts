import { describe, it, expect } from 'vitest'
import YorubaFamily, { type YorubaFamilyData } from './yoruba.ts'

describe('YorubaFamily', () => {
  const data: YorubaFamilyData = {
    nationality: 'Yoruba',
    size: 3
  }

  describe('constructor', () => {
    it('creates a Yoruba family', () => {
      const actual = new YorubaFamily()
      expect(actual).toBeInstanceOf(YorubaFamily)
    })

    it('sets nationality to Yoruba', () => {
      const actual = new YorubaFamily()
      expect(actual.nationality).toBe('Yoruba')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new YorubaFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })
})
