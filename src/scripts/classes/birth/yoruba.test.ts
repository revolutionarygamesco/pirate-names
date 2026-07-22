import { describe, expect, it } from 'vitest'
import YorubaBirthContext from './yoruba.ts'

describe('YorubaBirthContext', () => {
  describe('constructor', () => {
    it('returns a Yoruba birth context', () => {
      const actual = new YorubaBirthContext()
      expect(actual).toBeInstanceOf(YorubaBirthContext)
    })
  })
})
