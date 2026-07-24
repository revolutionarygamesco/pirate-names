import { describe, expect, it, vi } from 'vitest'
import { selectRandomTwinStatus } from '../../types/twin.ts'
import YorubaFamily from '../families/yoruba.ts'
import YorubaBirthContext from './yoruba.ts'

vi.mock('@revolutionarygamesco/common', async importOriginal => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  selectRandomBetween: vi.fn()
}))

vi.mock('../../types/twin.ts', async importOriginal => ({
  ...await importOriginal<typeof import('../../types/twin.ts')>(),
  selectRandomTwinStatus: vi.fn()
}))

describe('YorubaBirthContext', () => {
  describe('constructor', () => {
    it('returns a Yoruba birth context', () => {
      const actual = new YorubaBirthContext()
      expect(actual).toBeInstanceOf(YorubaBirthContext)
    })

    it('has an increased chance of twins', () => {
      new YorubaBirthContext({}, new YorubaFamily({ size: 4 }))
      expect(selectRandomTwinStatus).toHaveBeenCalledWith(100)
    })
  })
})
