import { describe, it, expect } from 'vitest'
import separateAnglicizedIrishName from './separate.ts'

describe('separateAnglicizedIrishName', () => {
  it('separates the Gaelic name from its parenthetical Anglicization', () => {
    const { gaelic, anglicization } = separateAnglicizedIrishName('Muire (Mary)')
    expect(gaelic).toBe('Muire')
    expect(anglicization).toBe('Mary')
  })
})
